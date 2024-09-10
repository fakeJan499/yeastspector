import { allVariablesSchema } from './schema';

const mapZodError = (error: Zod.ZodError) =>
    error.issues.map(issue => `\n\t${issue.path.join('.')} - ${issue.message}`);

export const validateEnvVariables = () => {
    const result = allVariablesSchema.safeParse(process.env);

    if (!result.success) {
        console.error(`❌ Invalid environment variables: ${mapZodError(result.error)}`);

        process.exit(1);
    }
};
