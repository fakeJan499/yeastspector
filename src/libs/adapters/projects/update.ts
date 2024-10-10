import db from '@/libs/db';
import { upload } from '@/libs/storage';
import { v4 } from 'uuid';
import { ProjectHeroImageUpdateData, ProjectImageUploadData } from './models';

export const uploadImage = async (data: ProjectImageUploadData): Promise<string> => {
    return db.runInTransaction(async tx => {
        const imageUuid = v4();
        await db.projectEvents.createProjectImageUploadedEvent(tx, {
            projectUuid: data.projectUuid,
            data: {
                type: 'ProjectImageUploaded',
                imageUuid,
                date: data.date,
                isDefault: data.isDefault,
            },
        });
        await upload(`projects/${data.projectUuid}/images/${imageUuid}`, data.image);
        return imageUuid;
    });
};

export const setHeroImage = async (data: ProjectHeroImageUpdateData): Promise<string> => {
    await db.run(async ctx => {
        await db.projectEvents.createProjectHeroImageUpdatedEvent(ctx, {
            projectUuid: data.projectUuid,
            data: {
                type: 'ProjectHeroImageUpdated',
                imageUuid: data.newHeroImageUuid,
                date: data.date,
            },
        });
    });

    return data.newHeroImageUuid;
};
