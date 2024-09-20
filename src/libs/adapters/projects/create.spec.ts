import { mockAdapter, mockDb } from '@/libs/test/mocks';
import { mockProjectCreateData } from '@/libs/test/mocks/adapters';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { create } from './create';

const mocks = vi.hoisted(() => {
    return {
        getState: vi.fn(),
        isEvolved: vi.fn().mockReturnValue(true),

        db: {
            runInTransaction: vi.fn().mockImplementation(fn => fn()),
            projects: {
                create: vi.fn(),
            },
            projectEvents: {
                createProjectCreatedEvent: vi.fn(),
            },
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

describe('Projects Adapter create', () => {
    afterEach(() => {
        vi.restoreAllMocks();
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
        mocks.db.projectEvents.createProjectCreatedEvent.mockResolvedValue(
            projectCreatedEventDbResult,
        );
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
});
