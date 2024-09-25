import { GenericObject } from '@/libs/utils/types';

type Params = { [key: string]: string };
export type DataProvider = (
    request: Request,
    params: Params | undefined,
    obj: GenericObject,
) => Promise<any> | GenericObject;
type SingleProvidedData<T> = T extends DataProvider ? Awaited<ReturnType<T>> : never;
export type ProvidedData<T, R extends GenericObject = GenericObject> = T extends [
    infer U,
    ...infer Rest,
]
    ? ProvidedData<Rest, R & SingleProvidedData<U>>
    : R;

export const getProvidedData = async <T extends DataProvider[]>(
    request: Request,
    params: { [key: string]: string } | undefined,
    dataProviders: T,
): Promise<ProvidedData<T>> => {
    let data: Partial<ProvidedData<T>> = {};

    for (const provider of dataProviders) {
        data = await provider(request, params, data);
    }

    return data as ProvidedData<T>;
};
