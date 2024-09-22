import { ProjectCreatedEvent } from '@/libs/db/project-events/models';
import { Project, ProjectDetails } from '@/libs/db/projects/models';
import { RecursivePartial } from '@/libs/utils/types';
import { mockUuid } from './uuid';

export const mockProject = (model: Partial<Project> = {}): Project => {
    return {
        uuid: mockUuid(),
        ...model,
    };
};

export const mockProjectDetails = (model: Partial<ProjectDetails> = {}): ProjectDetails => {
    return {
        uuid: mockUuid(),
        events: [mockProjectCreatedEvent()],
        ...model,
    };
};

export const mockProjectCreatedEvent = (
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
