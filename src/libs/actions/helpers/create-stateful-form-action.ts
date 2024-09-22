import { StatefulFormAction } from '@/libs/actions/types';

type ActionParams<T> = Required<Parameters<StatefulFormAction<T>>>;
type Fn<T> = (...args: ActionParams<T>) => ReturnType<StatefulFormAction<T>>;

export const createStatefulFormAction =
    <T = null>(fn: Fn<T>): StatefulFormAction<T> =>
    async (state, formData) =>
        formData ? fn(state, formData) : { ok: false, errors: [] };
