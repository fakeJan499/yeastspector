import db from '@/libs/db';
import { Project, ProjectCreateData } from './models';
import { getState, isEvolved } from './state';

export const create = async (data: ProjectCreateData): Promise<Project> => {
    const projectRawData = await db.runInTransaction(async tx => {
        const { uuid } = await db.projects.create(tx, { userId: data.userId });
        const event = await db.projectEvents.createProjectCreatedEvent(tx, {
            projectUuid: uuid,
            data: {
                name: data.name,
                description: data.description,
                date: data.date,
                type: 'ProjectCreated',
            },
        });
        return { uuid, events: [event] } as const;
    });

    const project = getState({ uuid: projectRawData.uuid }, projectRawData.events);

    // It should never happen.
    if (!isEvolved(project)) throw new Error('Issue with project parsing');

    return project;
};
