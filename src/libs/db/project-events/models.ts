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

export type ProjectImageUploadedEventData = BaseProjectEventData<
    'ProjectImageUploaded',
    { imageUuid: string; date: Date; isDefault: boolean }
>;
export type ProjectImageUploadedEvent = BaseProjectEvent<ProjectImageUploadedEventData>;

export type ProjectEventData = ProjectCreatedEventData | ProjectImageUploadedEventData;
export type ProjectEvent = BaseProjectEvent<ProjectEventData>;

export type ProjectEventCreate<T extends ProjectEvent> = Omit<T, 'uuid'>;
