export const validationLimits = {
    name: {
        min: 3,
        max: 100,
    },
    description: {
        max: 2000,
    },
    image: {
        maxSizeInMB: 2,
        maxCount: 10,
    },
} as const;
