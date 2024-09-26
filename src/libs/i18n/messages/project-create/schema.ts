import { pluralTranslation } from '@/libs/utils/schemas';
import Z from 'zod';

export const projectCreateMessagesSchema = Z.object({
    header: Z.string(),
    form: Z.object({
        fields: Z.object({
            name: Z.object({
                label: Z.string(),
                placeholder: Z.string(),
                errors: Z.object({
                    required: Z.string(),
                    'min-length': pluralTranslation(),
                    'max-length': pluralTranslation(),
                }),
            }),
            description: Z.object({
                label: Z.string(),
                placeholder: Z.string(),
                errors: Z.object({
                    'max-length': pluralTranslation(),
                }),
            }),
            date: Z.object({
                label: Z.string(),
                errors: Z.object({
                    required: Z.string(),
                    max: Z.string(),
                }),
            }),
            image: Z.object({
                label: Z.string(),
                errors: Z.object({
                    'max-size': Z.string(),
                    'invalid-type': Z.string(),
                }),
            }),
        }),
        actions: Z.object({
            submit: Z.string(),
            cancel: Z.string(),
        }),
    }),
});
