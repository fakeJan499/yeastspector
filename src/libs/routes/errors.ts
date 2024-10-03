import Z from 'zod';

type HttpErrorData = {
    message: string;
    field?: string;
};

export type HttpErrorBody = {
    errors: HttpErrorData[];
};

class HttpError extends Error {
    protected constructor(
        public readonly status: number,
        public readonly body: HttpErrorBody | null,
    ) {
        super();
    }
}
export class HttpNotFoundError extends HttpError {
    constructor(body: HttpErrorBody) {
        super(404, body);
    }
}
export class HttpBadRequestError extends HttpError {
    constructor(body: HttpErrorBody) {
        super(400, body);
    }
}
export class HttpUnauthorizedError extends HttpError {
    constructor() {
        super(401, { errors: [{ message: 'Unauthenticated' }] });
    }
}
export class HttpForbiddenError extends HttpError {
    constructor() {
        super(403, { errors: [{ message: 'Unauthorized' }] });
    }
}
export class HttpInternalServerError extends HttpError {
    constructor() {
        super(500, null);
    }
}

export const handleHttpError = (error: unknown) => {
    if (!(error instanceof HttpError)) return new Response(null, { status: 500 });

    return new Response(error.body ? JSON.stringify(error.body) : null, {
        status: error.status,
    });
};

export const mapZodError = (error: Z.ZodError): HttpErrorData[] =>
    error.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message,
    }));
