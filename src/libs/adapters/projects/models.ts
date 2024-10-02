export type ProjectImage = {
    uuid: string;
    url: string;
};

type BaseProjectEventData<
    T extends string = string,
    D extends Record<string, unknown> = Record<string, unknown>,
> = D & { type: T };
type BaseProjectEvent<T extends BaseProjectEventData> = {
    uuid: string;
    projectUuid: string;
    data: T;
};

type ProjectCreatedEventData = BaseProjectEventData<
    'ProjectCreated',
    { name: string; description: string; date: Date }
>;
export type ProjectCreatedEvent = BaseProjectEvent<ProjectCreatedEventData>;

type ProjectImageUploadedEventData = BaseProjectEventData<
    'ProjectImageUploaded',
    { imageUuid: string; date: Date; isDefault: boolean }
>;
export type ProjectImageUploadedEvent = BaseProjectEvent<ProjectImageUploadedEventData>;

export type ProjectEvent = BaseProjectEvent<
    ProjectCreatedEventData | ProjectImageUploadedEventData
>;

export type BaseProject = {
    uuid: string;
    userId: string;
};
export type CreatedProject = BaseProject & {
    status: 'created';
    name: string;
    description: string;
    createdAt: Date;
    heroImage: ProjectImage;
    images: ProjectImage[];
};
export type Project = CreatedProject;

export type ProjectCreateData = Omit<ProjectCreatedEventData, 'type'> & {
    userId: string;
    image: Blob | null;
};
export type ProjectFilter = { userId?: string; uuid?: string };
