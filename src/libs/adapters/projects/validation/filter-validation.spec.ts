import { mockProjectFilter } from '@/libs/test/mocks/adapters';
import { expect, it } from 'vitest';
import { isFilterValid } from './filter-validation';

it('should return false if uuid is not a valid uuid', () => {
    const filter = mockProjectFilter({ uuid: 'invalid-uuid' });

    const result = isFilterValid(filter);

    expect(result).toBe(false);
});

it('should return true for valid filter', () => {
    const filter = mockProjectFilter();

    const result = isFilterValid(filter);

    expect(result).toBe(true);
});
