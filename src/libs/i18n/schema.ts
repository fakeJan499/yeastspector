import { z } from 'zod';
import { generalMessagesSchema } from './messages/general/schema';
import { projectCreateMessagesSchema } from './messages/project-create/schema';
import { projectsMessagesSchema } from './messages/projects/schema';
import { projectDetailsMessagesSchema } from './messages/project-details/schema';
import { projectValidationMessagesSchema } from './messages/project-validation/schema';

export const schema = z.object({
    general: generalMessagesSchema,
    projects: projectsMessagesSchema,
    'project-create': projectCreateMessagesSchema,
    'project-details': projectDetailsMessagesSchema,
    'project-validation': projectValidationMessagesSchema,
});
