import {
    BaseProject,
    CreatedProject,
    ProjectCreateData,
    ProjectCreatedEvent,
    ProjectFilter,
} from '@/libs/adapters/projects/models';
import { RecursivePartial } from '@/libs/utils/types';
import { mockUuid } from './uuid';

export const mockBaseProject = (model: RecursivePartial<BaseProject> = {}): BaseProject => {
    return {
        uuid: mockUuid(),
        ...model,
    };
};

export const mockCreatedProject = (
    model: RecursivePartial<CreatedProject> = {},
): CreatedProject => {
    return {
        status: 'created',
        uuid: mockUuid(),
        name: 'any',
        description: '',
        createdAt: new Date(),
        ...model,
    };
};

export const mockProjectCreateEvent = (
    model: RecursivePartial<ProjectCreatedEvent> = {},
): ProjectCreatedEvent => {
    const { data, ...eventBasicData } = model;

    return {
        uuid: mockUuid(),
        projectUuid: mockUuid(),
        ...eventBasicData,
        data: {
            type: 'ProjectCreated',
            name: 'any',
            description: '',
            date: new Date(),
            ...data,
        },
    };
};

export const mockProjectFilter = (model: RecursivePartial<ProjectFilter> = {}): ProjectFilter => {
    return {
        userId: 'anyId123',
        ...model,
    };
};

export const mockProjectCreateData = (
    model: RecursivePartial<ProjectCreateData> = {},
): ProjectCreateData => {
    return {
        userId: 'anyId',
        date: new Date(),
        name: 'any',
        description: '',
        ...model,
    };
};
