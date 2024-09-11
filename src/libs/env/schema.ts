import Z from 'Zod';

export const publicVariablesSchema = Z.object({});

export const allVariablesSchema = publicVariablesSchema.merge(Z.object({}));
