import { DbClient } from '@/libs/db/db-client';
import { ProjectDetails, ProjectsFilter } from './models';

export const findMany = async (db: DbClient, filter: ProjectsFilter): Promise<ProjectDetails[]> => {
    return db.projects.findMany({
        select: { uuid: true, events: true },
        where: { userId: filter.userId },
    });
};
