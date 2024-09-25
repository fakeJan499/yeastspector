import { HttpBadRequestError, HttpInternalServerError, mapZodError } from '@/libs/routes/errors';
import Z from 'zod';
import { DataProvider } from './base';

export const withParams = <V extends Record<string, any>>(schema: Z.ZodObject<V>) =>
    (async (_, params, obj) => {
        try {
            const parsedParams = await schema.parseAsync(params);

            return { ...obj, params: parsedParams };
        } catch (error) {
            if (error instanceof Z.ZodError) {
                throw new HttpBadRequestError({ errors: mapZodError(error) });
            }

            throw new HttpInternalServerError();
        }
    }) satisfies DataProvider;
