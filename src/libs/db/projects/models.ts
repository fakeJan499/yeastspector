import { ProjectEvent } from '@/libs/adapters/projects/models';

export type Project = {
    uuid: string;
};

export type ProjectDetails = Project & { events: ProjectEvent[] };

export type ProjectCreate = { userId: string };

export type ProjectsFilter = {
    userId?: string;
};
