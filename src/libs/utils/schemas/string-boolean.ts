import Z from 'zod';

/**
 * A Zod schema that allows for boolean values to be passed as strings.
 */
export const stringBooleanSchema = Z.preprocess(x => {
    if (typeof x === 'string') {
        const truthy = ['true', '1', 'on', 'yes'];
        const falsy = ['false', '0', 'off', 'no'];

        if (truthy.includes(x.toLowerCase())) return true;
        if (falsy.includes(x.toLowerCase())) return false;
    }

    return x;
}, Z.boolean());
