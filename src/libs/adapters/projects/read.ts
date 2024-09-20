import db from '@/libs/db';
import { Project, ProjectFilter } from './models';
import { getState, isEvolved } from './state';

export const findMany = async (filter: ProjectFilter): Promise<Project[]> => {
    const projects = await db.run(client => db.projects.findMany(client, filter));
    return projects
        .map(project => getState({ uuid: project.uuid }, project.events))
        .filter(isEvolved);
};
