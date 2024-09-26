import {
    BaseProject,
    CreatedProject,
    ProjectCreateData,
    ProjectCreatedEvent,
    ProjectFilter,
    ProjectImage,
    ProjectImageUploadedEvent,
} from '@/libs/adapters/projects/models';
import { RecursivePartial } from '@/libs/utils/types';
import { mockUuid } from './uuid';

export const mockBaseProject = (model: RecursivePartial<BaseProject> = {}): BaseProject => {
    return {
        uuid: mockUuid(),
        userId: 'anyId',
        ...model,
    };
};

export const mockCreatedProject = (model: Partial<CreatedProject> = {}): CreatedProject => {
    return {
        status: 'created',
        uuid: mockUuid(),
        userId: 'anyId',
        name: 'any',
        description: '',
        createdAt: new Date(),
        images: [],
        heroImage: null,
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

export const mockProjectImageUploadedEvent = (
    model: RecursivePartial<ProjectImageUploadedEvent> = {},
): ProjectImageUploadedEvent => {
    const { data, ...eventBasicData } = model;

    return {
        uuid: mockUuid(),
        projectUuid: mockUuid(),
        ...eventBasicData,
        data: {
            type: 'ProjectImageUploaded',
            date: new Date(),
            imageUuid: mockUuid(),
            isDefault: false,
            ...data,
        },
    };
};

export const mockProjectImage = (model: Partial<ProjectImage> = {}): ProjectImage => {
    return {
        uuid: mockUuid(),
        url: 'any',
        ...model,
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
        image: null,
        ...model,
    };
};
