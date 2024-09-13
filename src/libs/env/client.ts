'use client';

import { env } from 'next-runtime-env';
import Z from 'zod';
import { publicVariablesSchema } from './schema';

export const getPublicEnvVariable = <K extends keyof Z.infer<typeof publicVariablesSchema>>(
    key: K,
): Z.infer<typeof publicVariablesSchema>[K] => {
    const variable = env(key);

    return publicVariablesSchema.shape[key].parse(variable) as Z.infer<
        typeof publicVariablesSchema
    >[K];
};
