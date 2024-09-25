import { getUser } from '@/libs/auth';
import { HttpUnauthorizedError } from '@/libs/routes/errors';
import { DataProvider } from './base';

export const withAuthentication = () =>
    (async (_, __, obj) => {
        const user = await getUser();

        if (!user) {
            throw new HttpUnauthorizedError();
        }

        return { ...obj, user: user };
    }) satisfies DataProvider;
