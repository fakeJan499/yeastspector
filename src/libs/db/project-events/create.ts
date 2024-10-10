import { DbClient } from '@/libs/db/db-client';
import {
    ProjectCreatedEvent,
    ProjectEvent,
    ProjectEventCreate,
    ProjectHeroImageUpdatedEvent,
    ProjectImageUploadedEvent,
} from './models';

const create = async <T extends ProjectEvent>(
    db: DbClient,
    data: ProjectEventCreate<T>,
): Promise<ProjectEvent> => {
    return db.projectEvents.create({
        select: { uuid: true, projectUuid: true, data: true },
        data: data,
    });
};

export const createProjectCreatedEvent = async (
    db: DbClient,
    data: ProjectEventCreate<ProjectCreatedEvent>,
): Promise<ProjectEvent> => create(db, data);

export const createProjectImageUploadedEvent = async (
    db: DbClient,
    data: ProjectEventCreate<ProjectImageUploadedEvent>,
): Promise<ProjectEvent> => create(db, data);

export const createProjectHeroImageUpdatedEvent = async (
    db: DbClient,
    data: ProjectEventCreate<ProjectHeroImageUpdatedEvent>,
): Promise<ProjectEvent> => create(db, data);
