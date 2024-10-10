import {
    BaseProject,
    Project,
    ProjectCreatedEvent,
    ProjectEvent,
    ProjectImage,
    ProjectImageUploadedEvent,
} from '@/libs/adapters/projects/models';
import { v4 } from 'uuid';
import { IllegalEventError } from './illegal-event-errors';
import { isEvolved } from './is-evolved';

const defaultProjectImage: ProjectImage = {
    uuid: v4(),
    url: '/images/project-default.png',
};

const getProjectImage = (project: BaseProject, imageUuid: string): ProjectImage => ({
    uuid: imageUuid,
    url: `/projects/${project.uuid}/images/${imageUuid}`,
});

const convertEvent = (event: ProjectEvent): Project['events'][number] => ({
    uuid: event.uuid,
    type: event.data.type,
    date: event.data.date,
});

const handleProjectCreation = (
    state: Project | BaseProject,
    event: ProjectCreatedEvent,
): Project => {
    if (isEvolved(state))
        throw new IllegalEventError(
            `Cannot apply event of type ${event.data.type} to Project with status ${state.status}`,
        );

    return {
        ...state,
        status: 'created',
        name: event.data.name,
        description: event.data.description,
        createdAt: event.data.date,
        heroImage: defaultProjectImage,
        images: [],
        events: [convertEvent(event)],
    };
};

const handleImageUpload = (
    state: Project | BaseProject,
    event: ProjectImageUploadedEvent,
): Project => {
    if (!isEvolved(state)) {
        throw new IllegalEventError(
            `Cannot apply event of type ${event.data.type} to not evolved Project`,
        );
    }

    if (state.images.some(x => x.uuid === event.data.imageUuid)) {
        throw new IllegalEventError(`Cannot upload image that already exists in Project`);
    }

    const newImage = getProjectImage(state, event.data.imageUuid);

    return {
        ...state,
        heroImage: event.data.isDefault ? newImage : state.heroImage,
        images: [...state.images, newImage],
        events: [...state.events, convertEvent(event)],
    };
};

export const evolve = (state: Project | BaseProject, event: ProjectEvent): Project => {
    switch (event.data.type) {
        case 'ProjectCreated':
            return handleProjectCreation(state, event as ProjectCreatedEvent);

        case 'ProjectImageUploaded':
            return handleImageUpload(state, event as ProjectImageUploadedEvent);
    }
};
