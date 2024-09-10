import { EmptyObject } from '@/libs/utils/types';
import { withPageAuthRequired as withPageAuthRequiredOrg } from '@auth0/nextjs-auth0';

export const withPageAuthRequired = <
    P extends Record<string, string> = EmptyObject,
    Q extends Record<string, string | string[] | undefined> = EmptyObject,
>(
    page: (arg: { params: P; searchParams: Q }) => Promise<React.JSX.Element>,
    config: { returnTo: (params: { params: P; searchParams: Q }) => Promise<string> | string },
) =>
    withPageAuthRequiredOrg(
        x => page({ params: x.params as P, searchParams: x.searchParams as Q }),
        {
            returnTo: obj =>
                config.returnTo({ params: obj.params as P, searchParams: obj.searchParams as Q }),
        },
    );
