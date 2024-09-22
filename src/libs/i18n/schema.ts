import { z } from 'zod';
import { generalMessagesSchema } from './messages/general/schema';
import { projectCreateMessagesSchema } from './messages/project-create/schema';
import { projectsMessagesSchema } from './messages/projects/schema';

export const schema = z.object({
    general: generalMessagesSchema,
    projects: projectsMessagesSchema,
    'project-create': projectCreateMessagesSchema,
});
