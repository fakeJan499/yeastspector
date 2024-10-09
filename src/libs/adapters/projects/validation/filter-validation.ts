import { ProjectFilter } from '@/libs/adapters/projects/models';
import { assertTypeEquality, IfEquals } from '@/libs/utils/types';
import Z from 'zod';

const filterSchema = Z.object({
    uuid: Z.string().uuid().optional(),
    userId: Z.string().optional(),
});

assertTypeEquality<IfEquals<Z.infer<typeof filterSchema>, ProjectFilter>>();

export const isFilterValid = (filter: ProjectFilter): boolean => {
    return filterSchema.safeParse(filter).success;
};
