'use server';

import adapters from '@/libs/adapters';
import { getUser } from '@/libs/auth';
import { revalidatePath } from 'next/cache';
import Z from 'zod';
import { createStatefulFormAction } from './helpers';

export const setHeroImage = createStatefulFormAction<string | null>(async (_, formData) => {
    const user = await getUser();

    if (!user) {
        return { ok: false, errors: [] };
    }

    const schema = Z.strictObject({
        imageUuid: Z.string().uuid(),
        projectUuid: Z.string().uuid(),
    });

    const { data, error, success } = schema.safeParse({
        imageUuid: formData.get('imageUuid'),
        projectUuid: formData.get('projectUuid'),
    });

    if (!success) {
        return {
            ok: false,
            errors: error.errors.map(error => ({
                field: error.path.join('.'),
                message: error.message,
            })),
        };
    }

    const project = await adapters.projects.find({ uuid: data.projectUuid, userId: user.sub });

    if (!project || !project.images.some(image => image.uuid === data.imageUuid)) {
        return { ok: false, errors: [] };
    }

    const imageUuid = await adapters.projects.setHeroImage({
        newHeroImageUuid: data.imageUuid,
        projectUuid: data.projectUuid,
        date: new Date(),
    });

    revalidatePath(`/projects/${data.projectUuid}`, 'page');

    return {
        ok: true,
        data: imageUuid,
    };
});
