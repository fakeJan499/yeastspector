import { DbClient } from '@/libs/db/db-client';
import { ProjectDetails, ProjectsFilter } from './models';

export const findMany = async (db: DbClient, filter: ProjectsFilter): Promise<ProjectDetails[]> => {
    return db.projects.findMany({
        select: { uuid: true, userId: true, events: true },
        where: { userId: filter.userId },
    });
};

export const find = async (
    db: DbClient,
    filter: ProjectsFilter,
): Promise<ProjectDetails | null> => {
    return db.projects.findFirst({
        select: { uuid: true, userId: true, events: true },
        where: { uuid: filter.uuid, userId: filter.userId },
    });
};
