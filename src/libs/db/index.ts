import * as client from './client';
import * as projectEvents from './project-events';
import type { ProjectEventData as ProjectEventDataModel } from './project-events/models';
import * as projects from './projects';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace PrismaJson {
        type ProjectEventData = ProjectEventDataModel;
    }
}

export const db = { ...client, projects, projectEvents } as const;

export default db;
