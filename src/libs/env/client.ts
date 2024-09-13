'use client';

import Z from 'zod';
import { publicVariablesSchema } from './schema';

const env = publicVariablesSchema.parse(process.env);

export const getPublicEnvVariable = <K extends keyof Z.infer<typeof publicVariablesSchema>>(
    key: K,
): Z.infer<typeof publicVariablesSchema>[K] => {
    return env[key];
};
