import { ProjectEvent } from '@/libs/db/project-events/models';

export type Project = {
    uuid: string;
    userId: string;
};

export type ProjectDetails = Project & { events: ProjectEvent[] };

export type ProjectCreate = { userId: string };

export type ProjectsFilter = {
    uuid?: string;
    userId?: string;
};
