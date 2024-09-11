import { afterEach, describe, expect, test, vi } from 'vitest';
import { withPageAuthRequired } from './with-page-auth-required';

const mocks = vi.hoisted(() => {
    return {
        withPageAuthRequired: vi.fn(),
    };
});

vi.mock(import('@auth0/nextjs-auth0'), () => {
    return {
        withPageAuthRequired: mocks.withPageAuthRequired,
    };
});

describe(`withPageAuthRequired`, () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test(`should render page providing to it params and search params`, () => {
        const page = vi.fn().mockResolvedValue(null);
        const config = {
            returnTo: vi.fn().mockReturnValue('/any-url'),
        };
        const params = { id: '123' };
        const searchParams = { query: 'test', secondQuery: 'test2' };
        mocks.withPageAuthRequired.mockImplementation(pageFactory =>
            pageFactory({ params, searchParams }),
        );

        withPageAuthRequired(page, config);

        expect(page).toHaveBeenCalledWith({
            params,
            searchParams,
        });
    });

    test(`should call returnTo with correct params`, () => {
        const page = vi.fn().mockResolvedValue(null);
        const config = {
            returnTo: vi.fn().mockReturnValue('/mock-return-url'),
        };
        const params = { someID: 'my-id' };
        const searchParams = { searchParam: 'query string' };
        mocks.withPageAuthRequired.mockImplementation((_, config) =>
            config.returnTo({ params, searchParams }),
        );

        withPageAuthRequired(page, config);

        expect(config.returnTo).toHaveBeenCalledWith({
            params,
            searchParams,
        });
    });
});
