'use server';

import adapters from '@/libs/adapters';
import { getUser } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { revalidatePath } from 'next/cache';
import Z from 'zod';
import { createStatefulFormAction } from './helpers';
import { validationLimits as validation } from './validation';

export const uploadImage = createStatefulFormAction<string | null>(async (_, formData) => {
    const user = await getUser();

    if (!user) {
        return { ok: false, errors: [] };
    }

    const { t } = await useI18n({ nameSpace: 'project-validation' });
    const schema = Z.strictObject({
        image: Z.preprocess(
            file => (file instanceof Blob && file.size ? file : null),
            Z.instanceof(Blob)
                .refine(file => file.size <= validation.image.maxSizeInMB * 1024 * 1024, {
                    message: t('fields.images.errors.max-size', {
                        count: validation.image.maxSizeInMB,
                    }),
                })
                .refine(file => file.type.startsWith('image/'), {
                    message: t('fields.images.errors.invalid-type'),
                }),
        ),
        projectUuid: Z.string().uuid(),
    });

    const { data, error, success } = schema.safeParse({
        image: formData.get('image'),
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

    if (!project) {
        return { ok: false, errors: [] };
    }

    if (project.images.length >= validation.image.maxCount) {
        return {
            ok: false,
            errors: [
                {
                    field: 'image',
                    message: t('fields.images.errors.max-count', {
                        count: validation.image.maxCount,
                    }),
                },
            ],
        };
    }

    const imageUuid = await adapters.projects.uploadImage({
        ...data,
        userId: user.sub,
        date: new Date(),
        isDefault: project.images.length === 0,
    });

    revalidatePath(`/projects/${data.projectUuid}`, 'page');

    return {
        ok: true,
        data: imageUuid,
    };
});
