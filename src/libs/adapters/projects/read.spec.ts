import db from '@/libs/db';
import { mockAdapter, mockDb } from '@/libs/test/mocks';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { findMany } from './read';

const mocks = vi.hoisted(() => {
    return {
        getState: vi.fn(),
        isEvolved: vi.fn().mockReturnValue(true),

        db: {
            run: vi.fn(),
            projects: {
                findMany: vi.fn(),
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

describe('Projects Adapter findMany', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('should return projects', async () => {
        const dbClient = {};
        const filter = mockAdapter.mockProjectFilter();
        const projectDetails = mockDb.mockProjectDetails();
        const expectedProject = mockAdapter.mockCreatedProject({ uuid: projectDetails.uuid });
        mocks.db.run.mockImplementation(fn => fn(dbClient));
        mocks.db.projects.findMany.mockResolvedValue([projectDetails]);
        mocks.getState.mockReturnValue(expectedProject);

        const result = await findMany(filter);

        expect(result).toEqual([expectedProject]);
        expect(db.run).toHaveBeenCalledWith(expect.any(Function));
        expect(db.projects.findMany).toHaveBeenCalledWith(dbClient, filter);
        expect(mocks.getState).toHaveBeenCalledWith(
            { uuid: projectDetails.uuid },
            projectDetails.events,
        );
    });

    test('should filter out not evolved projects', async () => {
        const filter = mockAdapter.mockProjectFilter();
        const projectDetails = mockDb.mockProjectDetails();
        const expectedProject = mockAdapter.mockCreatedProject({ uuid: projectDetails.uuid });
        mocks.db.run.mockResolvedValue([projectDetails]);
        mocks.getState.mockReturnValue(expectedProject);
        mocks.isEvolved.mockReturnValue(false);

        const result = await findMany(filter);

        expect(result).toEqual([]);
    });
});
