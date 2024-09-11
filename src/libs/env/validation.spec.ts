import { afterEach, describe, expect, test, vi } from 'vitest';
import Z from 'zod';
import { mockConsole, mockProcess } from '../test/mocks';
import { allVariablesSchema } from './schema';
import { validateEnvVariables } from './validation';

describe('Env Variables Validation', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('should pass validation with correct environment variables', () => {
        const consoleSpy = mockConsole.mockError();
        const processExitSpy = mockProcess.mockExit();
        mockProcess.mockEnv();
        vi.spyOn(allVariablesSchema, 'safeParse').mockReturnValue({ success: true, data: {} });

        validateEnvVariables();

        expect(consoleSpy).not.toHaveBeenCalled();
        expect(processExitSpy).not.toHaveBeenCalled();
    });

    test('should fail validation with incorrect environment variables', () => {
        const consoleSpy = mockConsole.mockError();
        const processExitSpy = mockProcess.mockExit();
        mockProcess.mockEnv();
        vi.spyOn(allVariablesSchema, 'safeParse').mockReturnValue({
            success: false,
            error: Z.ZodError.create([]),
        });

        expect(() => validateEnvVariables()).toThrow();

        expect(consoleSpy).toHaveBeenCalled();
        expect(processExitSpy).toHaveBeenCalled();
    });
});
