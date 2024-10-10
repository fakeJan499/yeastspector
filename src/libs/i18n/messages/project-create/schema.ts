import Z from 'zod';

export const projectCreateMessagesSchema = Z.object({
    header: Z.string(),
    form: Z.object({
        fields: Z.object({
            name: Z.object({
                label: Z.string(),
                placeholder: Z.string(),
            }),
            description: Z.object({
                label: Z.string(),
                placeholder: Z.string(),
            }),
            date: Z.object({
                label: Z.string(),
            }),
            image: Z.object({
                label: Z.string(),
                actions: Z.object({
                    clear: Z.string(),
                }),
            }),
        }),
        actions: Z.object({
            submit: Z.string(),
            cancel: Z.string(),
        }),
    }),
});
