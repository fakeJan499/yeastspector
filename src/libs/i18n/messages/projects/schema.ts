import Z from 'zod';

export const projectsMessagesSchema = Z.object({
    header: Z.string(),
    actions: Z.object({
        'add-project': Z.string(),
    }),
    list: Z.object({
        empty: Z.string(),
        sort: Z.string(),
        columns: Z.object({
            name: Z.object({
                header: Z.string(),
            }),
            description: Z.object({
                header: Z.string(),
            }),
            'creation-date': Z.object({
                header: Z.string(),
            }),
            image: Z.object({
                header: Z.string(),
            }),
        }),
        pagination: Z.object({
            next: Z.string(),
            previous: Z.string(),
            'rows-per-page': Z.string(),
            'displayed-rows': Z.string(),
        }),
    }),
});
