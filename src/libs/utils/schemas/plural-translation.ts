import Z from 'zod';

export const pluralTranslation = () =>
    Z.string().regex(
        /\$t\(general:plurals\.\w*, { "count": {{count}}, "postProcess": "interval", "applyPostProcessor": true }\)/,
        'Invalid plural translation part: $t(...)',
    );
