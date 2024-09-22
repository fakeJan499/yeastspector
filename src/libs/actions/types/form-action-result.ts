export type FormActionErrorResult = {
    ok: false;
    errors: {
        message: string;
        field?: string;
    }[];
};
export type FormActionSuccessResult<T> = { ok: true; data: T };
export type FormActionResult<T> = FormActionErrorResult | FormActionSuccessResult<T> | undefined;
