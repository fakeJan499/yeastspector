import { BaseProject, Project } from '@/libs/adapters/projects/models';

export const isEvolved = (project: Project | BaseProject): project is Project =>
    !!(project as any).status;
