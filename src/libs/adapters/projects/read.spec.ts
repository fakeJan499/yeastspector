import db from '@/libs/db';
import { mockAdapter, mockDb } from '@/libs/test/mocks';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { find, findMany } from './read';

const mocks = vi.hoisted(() => {
    return {
        getState: vi.fn(),
        isEvolved: vi.fn().mockReturnValue(true),
        isFilterValid: vi.fn().mockReturnValue(true),

        db: {
            run: vi.fn().mockImplementation(fn => fn()),
            projects: {
                findMany: vi.fn().mockResolvedValue([]),
                find: vi.fn().mockResolvedValue(null),
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

vi.mock(import('./validation'), () => {
    return {
        isFilterValid: mocks.isFilterValid,
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('findMany', () => {
    test('should validate data before querying', async () => {
        const filter = mockAdapter.mockProjectFilter();
        mocks.isFilterValid.mockReturnValueOnce(true);

        await findMany(filter);

        expect(mocks.isFilterValid.mock.invocationCallOrder[0]).toBeLessThan(
            mocks.db.run.mock.invocationCallOrder[0],
        );
    });

    test('should return empty array if filter is invalid', async () => {
        const filter = mockAdapter.mockProjectFilter();
        mocks.isFilterValid.mockReturnValueOnce(false);

        const result = await findMany(filter);

        expect(result).toEqual([]);
    });

    test('should return projects', async () => {
        const dbClient = {};
        const filter = mockAdapter.mockProjectFilter();
        const projectDetails = mockDb.mockProjectDetails();
        const expectedProject = mockAdapter.mockCreatedProject({ uuid: projectDetails.uuid });
        mocks.db.run.mockImplementationOnce(fn => fn(dbClient));
        mocks.db.projects.findMany.mockResolvedValueOnce([projectDetails]);
        mocks.getState.mockReturnValueOnce(expectedProject);

        const result = await findMany(filter);

        expect(result).toEqual([expectedProject]);
        expect(db.run).toHaveBeenCalledWith(expect.any(Function));
        expect(db.projects.findMany).toHaveBeenCalledWith(dbClient, filter);
        expect(mocks.getState).toHaveBeenCalledWith(
            expect.objectContaining({ uuid: projectDetails.uuid }),
            projectDetails.events,
        );
    });

    test('should filter out not evolved projects', async () => {
        const filter = mockAdapter.mockProjectFilter();
        const projectDetails = mockDb.mockProjectDetails();
        const expectedProject = mockAdapter.mockCreatedProject({ uuid: projectDetails.uuid });
        mocks.db.projects.findMany.mockResolvedValueOnce([projectDetails]);
        mocks.getState.mockReturnValueOnce(expectedProject);
        mocks.isEvolved.mockReturnValueOnce(false);

        const result = await findMany(filter);

        expect(result).toEqual([]);
    });
});

describe('find', () => {
    test('should validate data before querying', async () => {
        const filter = mockAdapter.mockProjectFilter();
        mocks.isFilterValid.mockReturnValueOnce(true);

        await find(filter);

        expect(mocks.isFilterValid.mock.invocationCallOrder[0]).toBeLessThan(
            mocks.db.run.mock.invocationCallOrder[0],
        );
    });

    test('should return empty array if filter is invalid', async () => {
        const filter = mockAdapter.mockProjectFilter();
        mocks.isFilterValid.mockReturnValueOnce(false);

        const result = await findMany(filter);

        expect(result).toEqual([]);
    });

    test('should return null if project not found', async () => {
        const result = await find(mockAdapter.mockProjectFilter());

        expect(result).toBeNull();
    });

    test('should return null if project not evolved', async () => {
        mocks.db.projects.find.mockResolvedValueOnce(mockDb.mockProjectDetails());
        mocks.isEvolved.mockReturnValueOnce(false);

        const result = await find(mockAdapter.mockProjectFilter());

        expect(result).toBeNull();
    });

    test('should return project', async () => {
        const project = mockAdapter.mockCreatedProject();
        mocks.db.projects.find.mockResolvedValueOnce(mockDb.mockProjectDetails());
        mocks.getState.mockReturnValueOnce(project);

        const result = await find(mockAdapter.mockProjectFilter());

        expect(result).toEqual(project);
    });
});
