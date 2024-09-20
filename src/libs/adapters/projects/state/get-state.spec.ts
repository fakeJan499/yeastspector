import { ProjectEvent } from '@/libs/adapters/projects/models';
import { mockAdapter } from '@/libs/test/mocks';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { getState } from './get-state';

const mocks = vi.hoisted(() => {
    return {
        evolve: vi.fn(),
    };
});

vi.mock(import('./evolve'), () => {
    return {
        evolve: mocks.evolve,
    };
});

describe('getState', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('should return base project if there are no events', () => {
        const project = mockAdapter.mockBaseProject();
        const events: ProjectEvent[] = [];

        const evolvedProject = getState(project, events);

        expect(evolvedProject).toEqual(project);
    });

    test('should return created project if there is a ProjectCreated event', () => {
        const project = mockAdapter.mockBaseProject();
        const event = mockAdapter.mockProjectCreateEvent();
        const createdProject = mockAdapter.mockCreatedProject();
        mocks.evolve.mockReturnValue(createdProject);

        const evolvedProject = getState(project, [event]);

        expect(evolvedProject).toEqual(createdProject);
        expect(mocks.evolve).toHaveBeenCalledOnce();
        expect(mocks.evolve).toHaveBeenCalledWith(project, event);
    });
});
