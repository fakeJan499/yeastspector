'use server';

import adapters from '@/libs/adapters';
import { getUser } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { isBefore, parse } from '@/libs/utils/date';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Z from 'zod';
import { createStatefulFormAction } from './helpers';

const validation = {
    name: {
        min: 3,
        max: 100,
    },
    description: {
        max: 2000,
    },
    image: {
        maxSizeInMB: 2,
    },
};

export const createProject = createStatefulFormAction(async (_, formData) => {
    const user = await getUser();

    if (!user) {
        return { ok: false, errors: [] };
    }

    const { t, lang } = await useI18n({ nameSpace: 'project-create' });

    const payload = {
        name: formData.get('name')?.toString(),
        description: formData.get('description')?.toString(),
        date: parse(formData.get('date')?.toString() ?? '', lang),
        image: formData.get('image'),
    };

    const schema = Z.strictObject({
        name: Z.string({ message: t('form.fields.name.errors.required') })
            .trim()
            .min(validation.name.min, {
                message: t('form.fields.name.errors.min-length', {
                    postProcess: 'interval',
                    count: validation.name.min,
                }),
            })
            .max(validation.name.max, {
                message: t('form.fields.name.errors.max-length', {
                    postProcess: 'interval',
                    count: validation.name.max,
                }),
            }),
        description: Z.string()
            .trim()
            .max(validation.description.max, {
                message: t('form.fields.description.errors.max-length', {
                    count: (payload.description ?? '').length - validation.description.max,
                }),
            })
            .default(''),
        date: Z.date({ message: t('form.fields.date.errors.required') }).refine(
            val => isBefore(val, new Date()),
            {
                message: t('form.fields.date.errors.max'),
            },
        ),
        image: Z.preprocess(
            file => (file instanceof Blob && file.size ? file : null),
            Z.instanceof(Blob)
                .refine(file => file.size <= validation.image.maxSizeInMB * 1024 * 1024, {
                    message: t('form.fields.image.errors.max-size', {
                        count: validation.image.maxSizeInMB,
                    }),
                })
                .refine(file => file.type.startsWith('image/'), {
                    message: t('form.fields.image.errors.invalid-type'),
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
