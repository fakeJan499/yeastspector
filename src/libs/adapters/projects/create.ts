import db from '@/libs/db';
import { upload } from '@/libs/storage';
import { v4 } from 'uuid';
import { Project, ProjectCreateData } from './models';
import { getState, isEvolved } from './state';

export const create = async (data: ProjectCreateData): Promise<Project> => {
    const projectRawData = await db.runInTransaction(async tx => {
        const { uuid } = await db.projects.create(tx, { userId: data.userId });
        const projectCreatedEvent = await db.projectEvents.createProjectCreatedEvent(tx, {
            projectUuid: uuid,
            data: {
                name: data.name,
                description: data.description,
                date: data.date,
                type: 'ProjectCreated',
            },
        });

        if (data.image) {
            const imageUuid = v4();
            await upload(`projects/${uuid}/images/${imageUuid}`, data.image);
            const projectImageUploadedEvent =
                await db.projectEvents.createProjectImageUploadedEvent(tx, {
                    projectUuid: uuid,
                    data: {
                        type: 'ProjectImageUploaded',
                        imageUuid,
                        date: new Date(),
                        isDefault: true,
                    },
                });

            return { uuid, events: [projectCreatedEvent, projectImageUploadedEvent] };
        }

        return { uuid, events: [projectCreatedEvent] };
    });

    const project = getState(
        { uuid: projectRawData.uuid, userId: data.userId },
        projectRawData.events,
    );

    // It should never happen.
    if (!isEvolved(project)) throw new Error('Issue with project parsing');

    return project;
};
