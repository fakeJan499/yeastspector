import Z from 'zod';
import { allVariablesSchema } from './schema';
import { env } from 'next-runtime-env';

export const getEnvVariable = <K extends keyof Z.infer<typeof allVariablesSchema>>(
    key: K,
): Z.infer<typeof allVariablesSchema>[K] => {
    const variable = env(key);

    return allVariablesSchema.shape[key].parse(variable) as Z.infer<typeof allVariablesSchema>[K];
};
