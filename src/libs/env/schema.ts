import Z from 'zod';

export const publicVariablesSchema = Z.object({});

export const allVariablesSchema = publicVariablesSchema.merge(Z.object({}));
