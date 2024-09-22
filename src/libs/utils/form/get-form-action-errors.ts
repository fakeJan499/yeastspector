import { FormActionResult } from '@/libs/actions/types';

export const getFormActionErrors = (
    formActionResult: FormActionResult<unknown>,
): Record<string, string[]> => {
    if (!formActionResult || formActionResult.ok) {
        return {};
    }

    return formActionResult.errors.reduce<Record<string, string[]>>((acc, error) => {
        const field = error.field ?? 'global';
        const accMessage = acc[field] ?? [];

        return { ...acc, [field]: [...accMessage, error.message] };
    }, {});
};

export const getFormActionMergedMessages = (
    formActionResult: FormActionResult<unknown>,
): Record<string, string> => {
    const errors = getFormActionErrors(formActionResult);

    return mergeFormActionMessages(errors);
};

export const mergeFormActionMessages = (errors: Record<string, string[]>) =>
    Object.entries(errors).reduce<Record<string, string>>((acc, [field, messages]) => {
        return { ...acc, [field]: messages.join(' ') };
    }, {});
