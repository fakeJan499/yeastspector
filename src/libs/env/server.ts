import Z from 'zod';
import { allVariablesSchema } from './schema';

const env = allVariablesSchema.parse(process.env);

export const getEnvVariable = <K extends keyof Z.infer<typeof allVariablesSchema>>(
    key: K,
): Z.infer<typeof allVariablesSchema>[K] => {
    return env[key];
};
