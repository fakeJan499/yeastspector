type BaseProjectEventData<
    T extends string = string,
    D extends Record<string, unknown> = Record<string, unknown>,
> = D & { type: T };
type BaseProjectEvent<T extends BaseProjectEventData> = {
    uuid: string;
    projectUuid: string;
    data: T;
};

export type ProjectCreatedEventData = BaseProjectEventData<
    'ProjectCreated',
    { name: string; description: string; date: Date }
>;
export type ProjectCreatedEvent = BaseProjectEvent<ProjectCreatedEventData>;

export type ProjectEventData = ProjectCreatedEventData;
export type ProjectEvent = ProjectCreatedEvent;

export type ProjectEventCreate<T extends ProjectEvent> = Omit<T, 'uuid'>;
