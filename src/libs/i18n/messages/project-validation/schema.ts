import { pluralTranslation } from '@/libs/utils/schemas';
import Z from 'zod';

export const projectValidationMessagesSchema = Z.object({
    fields: Z.object({
        name: Z.object({
            errors: Z.object({
                required: Z.string(),
                'min-length': pluralTranslation(),
                'max-length': pluralTranslation(),
            }),
        }),
        description: Z.object({
            errors: Z.object({
                'max-length': pluralTranslation(),
            }),
        }),
        date: Z.object({
            errors: Z.object({
                required: Z.string(),
                max: Z.string(),
            }),
        }),
        images: Z.object({
            errors: Z.object({
                'max-size': Z.string(),
                'invalid-type': Z.string(),
                'max-count': Z.string(),
            }),
        }),
    }),
});
