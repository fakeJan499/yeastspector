import Z from 'zod';

export const generalMessagesSchema = Z.object({
    plurals: Z.object({
        chars: Z.string(),
    }),
});
