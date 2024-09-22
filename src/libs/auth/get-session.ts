import { getSession } from '@auth0/nextjs-auth0';

type User = {
    sub: string;
};

export const getUser = async (): Promise<User | null> => {
    const session = await getSession();

    if (session) {
        return session.user as User;
    }

    return null;
};
