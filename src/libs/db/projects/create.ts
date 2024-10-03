import { DbClient } from '@/libs/db/db-client';
import { Project, ProjectCreate } from './models';

export const create = async (db: DbClient, data: ProjectCreate): Promise<Project> => {
    const { uuid, userId } = await db.projects.create({
        select: { uuid: true, userId: true },
        data: { userId: data.userId },
    });

    return { uuid, userId };
};
