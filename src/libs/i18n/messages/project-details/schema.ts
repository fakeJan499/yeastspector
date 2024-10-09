import Z from 'zod';

export const projectDetailsMessagesSchema = Z.object({
    header: Z.string(),
    'heading-actions': Z.object({
        'navigate-back': Z.string(),
    }),
    details: Z.object({
        title: Z.string(),
        'created-at': Z.string(),
    }),
    description: Z.object({
        title: Z.string(),
        empty: Z.string(),
        actions: Z.object({
            edit: Z.string(),
        }),
    }),
    images: Z.object({
        title: Z.string(),
        empty: Z.string(),
        actions: Z.object({
            add: Z.string(),
        }),
    }),
    timeline: Z.object({
        title: Z.string(),
        types: Z.object({
            'project-created': Z.string(),
            'project-image-uploaded': Z.string(),
        }),
    }),
});
