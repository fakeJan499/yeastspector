import { BaseProject, Project, ProjectEvent } from '@/libs/adapters/projects/models';
import { isEvolved } from './is-evolved';
import { IllegalEventError } from './illegal-event-errors';

export const evolve = (state: Project | BaseProject, event: ProjectEvent): Project => {
    const {
        data: { type, ...data },
    } = event;

    switch (type) {
        case 'ProjectCreated':
            if (isEvolved(state))
                throw new IllegalEventError(
                    `Cannot apply event of type ${type} to Project with status ${state.status}`,
                );

            return {
                ...state,
                status: 'created',
                name: data.name,
                description: data.description,
                createdAt: data.date,
            };
    }
};
