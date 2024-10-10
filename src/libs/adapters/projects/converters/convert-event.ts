import { ProjectEvent as AdaptedProjectEvent } from '@/libs/adapters/projects/models';
import { ProjectEvent as DbProjectEvent } from '@/libs/db/project-events/models';

export const convertEvents = (events: DbProjectEvent[]): AdaptedProjectEvent[] =>
    events.map(convertEvent);

export const convertEvent = (event: DbProjectEvent): AdaptedProjectEvent => {
    switch (event.data.type) {
        case 'ProjectCreated':
            return {
                uuid: event.projectUuid,
                projectUuid: event.projectUuid,
                data: {
                    type: 'ProjectCreated',
                    date: event.data.date,
                    description: event.data.description,
                    name: event.data.name,
                },
            };
        case 'ProjectImageUploaded':
            return {
                uuid: event.projectUuid,
                projectUuid: event.projectUuid,
                data: {
                    type: 'ProjectImageUploaded',
                    date: event.data.date,
                    imageUuid: event.data.imageUuid,
                    isDefault: event.data.isDefault,
                },
            };
        case 'ProjectHeroImageUpdated':
            return {
                uuid: event.projectUuid,
                projectUuid: event.projectUuid,
                data: {
                    type: 'ProjectHeroImageUpdated',
                    date: event.data.date,
                    newHeroImageUuid: event.data.imageUuid,
                },
            };
    }
};
