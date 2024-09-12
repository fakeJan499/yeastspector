import Z from 'zod';

export const publicVariablesSchema = Z.object({});

export const allVariablesSchema = publicVariablesSchema.merge(
    Z.object({
        AUTH0_SECRET: Z.string().min(12),
        AUTH0_BASE_URL: Z.string().url(),
        AUTH0_ISSUER_BASE_URL: Z.string().url(),
        AUTH0_CLIENT_ID: Z.string(),
        AUTH0_CLIENT_SECRET: Z.string(),
    }),
);
