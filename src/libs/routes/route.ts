import { handleHttpError } from './errors';
import { DataProvider, getProvidedData, ProvidedData } from './input/base';

/**
 * Creates a route handler that processes the request using the provided data providers and handler function.
 *
 * Response of a created handler is processed as follows:
 *    - If the result is null or undefined, returns a 204 No Content response.
 *    - If the result is an instance of Response, returns the result as is.
 *    - Otherwise, returns the result as a JSON response.
 *
 * @param handler - A function that processes the provided data and returns a result or a promise of a result.
 * @param dataProviders - An array of data providers that supply data to the handler function.
 *
 * @returns An asynchronous function that handles the request, processes the data, and returns a response.
 *
 * @example export const GET = route(async ({ params, user }) => {/ * handler code * /}, ...[withAuthentication(), withParams(Z.object({ /* schema * / }))]);
 */
export const route = <T extends DataProvider[], R>(
    handler: (data: ProvidedData<T>) => Promise<R> | R,
    ...dataProviders: [...T]
) => {
    return async (request: Request, { params }: { params?: { [key: string]: string } }) => {
        try {
            const data = await getProvidedData(request, params, dataProviders);
            const result = await handler(data);

            if (result === null || result === undefined) {
                return new Response(null, { status: 204 });
            }

            if (result instanceof Response) {
                return result;
            }

            return Response.json(result);
        } catch (error) {
            return handleHttpError(error);
        }
    };
};
