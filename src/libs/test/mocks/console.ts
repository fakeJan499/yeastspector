import { vi } from 'vitest';

export const mockError = () => vi.spyOn(console, 'error').mockImplementation(() => {});
