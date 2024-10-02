import { expect, test, vi } from 'vitest';
import { upload } from './upload';

const mocks = vi.hoisted(() => ({
    uploadBytes: vi.fn(),
    ref: vi.fn(),
    authenticate: vi.fn(),
}));

vi.mock(import('firebase/storage'), () => ({ uploadBytes: mocks.uploadBytes, ref: mocks.ref }));
vi.mock(import('./client'), () => ({
    authenticate: mocks.authenticate,
    getStorageClient: vi.fn().mockReturnValue({}),
}));

test('should upload a file', async () => {
    const file = new Blob();
    const path = 'path/to/file';
    const storageRef = {};
    mocks.ref.mockReturnValue(storageRef);

    await upload(path, file);

    expect(mocks.uploadBytes).toHaveBeenCalledWith(storageRef, file);
    expect(mocks.ref).toHaveBeenCalledWith(expect.anything(), path);
});

test('should authenticate before uploading a file', async () => {
    await upload('path/to/file', new Blob());

    expect(mocks.authenticate).toHaveBeenCalled();
    expect(
        mocks.authenticate.mock.invocationCallOrder[0],
        'expected to authenticate before uploading file',
    ).toBeLessThan(mocks.uploadBytes.mock.invocationCallOrder[0]);
});
