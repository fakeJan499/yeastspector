import { expect, test, vi } from 'vitest';
import { getFileStream } from './get-file-stream';

const mocks = vi.hoisted(() => ({
    getStream: vi.fn(),
    ref: vi.fn(),
    authenticate: vi.fn(),
}));

vi.mock(import('firebase/storage'), () => ({ getStream: mocks.getStream, ref: mocks.ref }));
vi.mock(import('./client'), () => ({
    authenticate: mocks.authenticate,
    getStorageClient: vi.fn().mockReturnValue({}),
}));

test('should get stream', async () => {
    const path = 'path/to/file';
    const storageRef = {};
    mocks.ref.mockReturnValue(storageRef);

    await getFileStream(path);

    expect(mocks.getStream).toHaveBeenCalledWith(storageRef);
    expect(mocks.ref).toHaveBeenCalledWith(expect.anything(), path);
});

test('should authenticate before getting stream', async () => {
    await getFileStream('any');

    expect(mocks.authenticate).toHaveBeenCalled();
    expect(
        mocks.authenticate.mock.invocationCallOrder[0],
        'expected to authenticate before getting stream',
    ).toBeLessThan(mocks.getStream.mock.invocationCallOrder[0]);
});
