import { mockAdapter } from '@/libs/test/mocks';
import { describe, expect, test } from 'vitest';
import { evolve } from './evolve';
import { IllegalEventError } from './illegal-event-errors';

describe('evolve', () => {
    test('should throw an error if trying to apply ProjectCreated event to evolved project', () => {
        const project = mockAdapter.mockCreatedProject();
        const event = mockAdapter.mockProjectCreateEvent();

        expect(() => evolve(project, event)).toThrowError(IllegalEventError);
    });

    test('should evolve project with ProjectCreated event', () => {
        const project = mockAdapter.mockBaseProject();
        const event = mockAdapter.mockProjectCreateEvent({
            data: {
                name: 'this is a name of this project',
                description: 'some random description \n it can be multiline',
                date: new Date('2021-01-01'),
            },
        });

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.status).toBe('created');
        expect(evolvedProject.name).toBe(event.data.name);
        expect(evolvedProject.description).toBe(event.data.description);
        expect(evolvedProject.createdAt).toBe(event.data.date);
    });
});
