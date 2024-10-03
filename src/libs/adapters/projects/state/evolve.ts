import { BaseProject, Project, ProjectEvent, ProjectImage } from '@/libs/adapters/projects/models';
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

export const evolve = (state: Project | BaseProject, event: ProjectEvent): Project => {
    const { data } = event;

    switch (data.type) {
        case 'ProjectCreated':
            if (isEvolved(state))
                throw new IllegalEventError(
                    `Cannot apply event of type ${data.type} to Project with status ${state.status}`,
                );

            return {
                ...state,
                status: 'created',
                name: data.name,
                description: data.description,
                createdAt: data.date,
                heroImage: { ...defaultProjectImage },
                images: [],
            };

        case 'ProjectImageUploaded':
            if (!isEvolved(state)) {
                throw new IllegalEventError(
                    `Cannot apply event of type ${data.type} to not evolved Project`,
                );
            }

            if (state.images.some(x => x.uuid === data.imageUuid)) {
                throw new IllegalEventError(`Cannot upload image that already exists in Project`);
            }

            return {
                ...state,
                heroImage: data.isDefault
                    ? getProjectImage(state, data.imageUuid)
                    : state.heroImage,
                images: [...state.images, getProjectImage(state, data.imageUuid)],
            };
    }
};
