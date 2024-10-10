import db from '@/libs/db';
import { convertEvents } from './converters';
import { Project, ProjectFilter } from './models';
import { getState, isEvolved } from './state';
import { isFilterValid } from './validation';

export const findMany = async (filter: ProjectFilter): Promise<Project[]> => {
    if (!isFilterValid(filter)) return [];

    const projects = await db.run(client => db.projects.findMany(client, filter));
    return projects
        .map(project =>
            getState({ uuid: project.uuid, userId: project.userId }, convertEvents(project.events)),
        )
        .filter(isEvolved);
};

export const find = async (filter: ProjectFilter): Promise<Project | null> => {
    if (!isFilterValid(filter)) return null;

    const rawProject = await db.run(client => db.projects.find(client, filter));

    if (!rawProject) {
        return null;
    }

    const project = getState(
        { uuid: rawProject.uuid, userId: rawProject.userId },
        convertEvents(rawProject.events),
    );

    return isEvolved(project) ? project : null;
};
