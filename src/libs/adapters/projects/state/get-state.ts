import { BaseProject, Project, ProjectEvent } from '@/libs/adapters/projects/models';
import { evolve } from './evolve';

export const getState = (
    state: BaseProject,
    events: Readonly<ProjectEvent[]>,
): Project | BaseProject => events.reduce((state, event) => evolve(state, event), state);
