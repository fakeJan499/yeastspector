import { DbClient } from '@/libs/db/db-client';
import { ProjectCreatedEvent, ProjectEvent, ProjectEventCreate } from './models';

export const createProjectCreatedEvent = async (
    db: DbClient,
    data: ProjectEventCreate<ProjectCreatedEvent>,
): Promise<ProjectEvent> => {
    return db.projectEvents.create({
        select: { uuid: true, projectUuid: true, data: true },
        data: data,
    });
};
