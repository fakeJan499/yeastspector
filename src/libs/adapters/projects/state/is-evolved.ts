import { BaseProject, Project } from '@/libs/adapters/projects/models';
import { GenericObject } from '@/libs/utils/types';

export const isEvolved = (project: Project | BaseProject): project is Project =>
    !!(project as GenericObject).status;
