import { z } from 'zod';
import { generalMessagesSchema } from './messages/general/schema';

export const schema = z.object({
    general: generalMessagesSchema,
});
