import db from '@/libs/db';
import { Project, ProjectFilter } from './models';
import { getState, isEvolved } from './state';

export const findMany = async (filter: ProjectFilter): Promise<Project[]> => {
    const projects = await db.run(client => db.projects.findMany(client, filter));
    return projects
        .map(project => getState({ uuid: project.uuid, userId: project.userId }, project.events))
        .filter(isEvolved);
};

export const find = async (filter: ProjectFilter): Promise<Project | null> => {
    const rawProject = await db.run(client => db.projects.find(client, filter));

    if (!rawProject) {
        return null;
    }

    const project = getState(
        { uuid: rawProject.uuid, userId: rawProject.userId },
        rawProject.events,
    );

    return isEvolved(project) ? project : null;
};
