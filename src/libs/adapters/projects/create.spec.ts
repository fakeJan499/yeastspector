import { mockAdapter, mockDb } from '@/libs/test/mocks';
import { mockProjectCreateData } from '@/libs/test/mocks/adapters';
import { mockUuid } from '@/libs/test/mocks/uuid';
import { afterEach, expect, test, vi } from 'vitest';
import { create } from './create';

const mocks = vi.hoisted(() => {
    return {
        getState: vi.fn(),
        isEvolved: vi.fn().mockReturnValue(true),
        uuid: vi.fn(),

        db: {
            runInTransaction: vi.fn().mockImplementation(fn => fn()),
            projects: {
                create: vi.fn(),
            },
            projectEvents: {
                createProjectCreatedEvent: vi.fn(),
                createProjectImageUploadedEvent: vi.fn(),
            },
        },

        storage: {
            upload: vi.fn(),
        },
    };
});

vi.mock(import('./state'), () => {
    return {
        getState: mocks.getState,
        isEvolved: mocks.isEvolved,
    };
});

vi.mock(import('@/libs/db'), () => {
    return {
        default: mocks.db,
        db: mocks.db,
    };
});

vi.mock(import('@/libs/storage'), () => {
    return {
        upload: mocks.storage.upload,
    };
});

vi.mock(import('uuid'), () => {
    return {
        v4: mocks.uuid,
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

test('should create project and ProjectCreated event in one transaction', async () => {
    const tx = {};
    const data = mockProjectCreateData();
    const createdProjectDbResult = mockDb.mockProject();
    const projectCreatedEventDbResult = mockDb.mockProjectCreatedEvent({
        projectUuid: createdProjectDbResult.uuid,
    });
    const expectedProject = mockAdapter.mockCreatedProject();
    mocks.db.runInTransaction.mockImplementation(fn => fn(tx));
    mocks.db.projects.create.mockResolvedValue(createdProjectDbResult);
    mocks.db.projectEvents.createProjectCreatedEvent.mockResolvedValue(projectCreatedEventDbResult);
    mocks.getState.mockReturnValue(expectedProject);

    const result = await create(data);

    expect(result).toEqual(expectedProject);
    expect(mocks.db.runInTransaction).toHaveBeenCalledWith(expect.any(Function));
    expect(mocks.db.projects.create).toHaveBeenCalledWith(tx, { userId: data.userId });
    expect(mocks.db.projectEvents.createProjectCreatedEvent).toHaveBeenCalledWith(tx, {
        projectUuid: createdProjectDbResult.uuid,
        data: {
            name: data.name,
            description: data.description,
            date: data.date,
            type: 'ProjectCreated',
        },
    });
});

test('should create project with image', async () => {
    const image = new Blob();
    const data = mockProjectCreateData({ image });
    const imageUuid = mockUuid();
    const projectImageUploadedEventDbResult = mockDb.mockProjectImageUploadedEvent();
    const createdProjectDbResult = mockDb.mockProject();
    mocks.db.projects.create.mockResolvedValue(createdProjectDbResult);
    mocks.db.projectEvents.createProjectImageUploadedEvent.mockResolvedValue(
        projectImageUploadedEventDbResult,
    );
    mocks.uuid.mockReturnValueOnce(imageUuid);

    await create(data);

    expect(mocks.db.projectEvents.createProjectImageUploadedEvent).toHaveBeenCalledOnce();
    expect(mocks.storage.upload).toHaveBeenCalledOnce();
    expect(mocks.storage.upload).toHaveBeenCalledWith(
        `projects/${createdProjectDbResult.uuid}/images/${imageUuid}`,
        image,
    );
    expect(
        mocks.getState.mock.calls[0][1],
        'events must contain ProjectImageUploaded',
    ).toContainEqual(projectImageUploadedEventDbResult);
});

test('should create events with specified date', async () => {
    const date = new Date();
    const data = mockProjectCreateData({ date, image: new Blob() });

    await create(data);

    const dateOfProjectCreatedEvent =
        mocks.db.projectEvents.createProjectCreatedEvent.mock.calls[0][1].data.date;
    const dateOfProjectImageUploadedEvent =
        mocks.db.projectEvents.createProjectImageUploadedEvent.mock.calls[0][1].data.date;

    expect(dateOfProjectCreatedEvent).toEqual(date);
    expect(dateOfProjectImageUploadedEvent).toEqual(date);
});
