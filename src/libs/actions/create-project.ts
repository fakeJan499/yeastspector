'use server';

import adapters from '@/libs/adapters';
import { getUser } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { isBefore, parse } from '@/libs/utils/date';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Z from 'zod';
import { createStatefulFormAction } from './helpers';
import { validationLimits as validation } from './validation';

export const createProject = createStatefulFormAction(async (_, formData) => {
    const user = await getUser();

    if (!user) {
        return { ok: false, errors: [] };
    }

    const { t, lang } = await useI18n({ nameSpace: 'project-validation' });

    const payload = {
        name: formData.get('name')?.toString(),
        description: formData.get('description')?.toString(),
        date: parse(formData.get('date')?.toString() ?? '', lang),
        image: formData.get('image'),
    };

    const schema = Z.strictObject({
        name: Z.string({ message: t('fields.name.errors.required') })
            .trim()
            .min(validation.name.min, {
                message: t('fields.name.errors.min-length', {
                    postProcess: 'interval',
                    count: validation.name.min,
                }),
            })
            .max(validation.name.max, {
                message: t('fields.name.errors.max-length', {
                    postProcess: 'interval',
                    count: validation.name.max,
                }),
            }),
        description: Z.string()
            .trim()
            .max(validation.description.max, {
                message: t('fields.description.errors.max-length', {
                    count: (payload.description ?? '').length - validation.description.max,
                }),
            })
            .default(''),
        date: Z.date({ message: t('fields.date.errors.required') }).refine(
            val => isBefore(val, new Date()),
            {
                message: t('fields.date.errors.max'),
            },
        ),
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
                })
                .nullable(),
        ),
    });

    const { data, error, success } = schema.safeParse(payload);

    if (!success) {
        return {
            ok: false,
            errors: error.errors.map(error => ({
                field: error.path.join('.'),
                message: error.message,
            })),
        };
    }

    await adapters.projects.create({ ...data, userId: user.sub });

    revalidatePath('/projects');
    redirect('/projects');
});
