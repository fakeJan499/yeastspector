import { FormActionResult } from './form-action-result';

export type StatefulFormAction<T = null> = (
    prevState: FormActionResult<T> | never,
    formData?: FormData,
) => Promise<FormActionResult<T>> | never;
