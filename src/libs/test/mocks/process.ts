import { vi } from 'vitest';

/**
 * Internally mocks the process.exit() method to throw an error when called.
 * Requires caching the error to prevent it from being thrown in the test.
 * @example
 * const foo = () => process.exit(1);
 * mockProcess.mockExit();
 * expect(() => foo()).toThrow();
 */
export const mockExit = () =>
    vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit()');
    });

export const mockEnv = () =>
    vi.spyOn(process, 'env', 'get').mockReturnValue({ NODE_ENV: 'development' });
