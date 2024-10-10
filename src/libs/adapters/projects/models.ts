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

type ProjectHeroImageUpdatedEventData = BaseProjectEventData<
    'ProjectHeroImageUpdated',
    { newHeroImageUuid: string; date: Date }
>;
export type ProjectHeroImageUpdatedEvent = BaseProjectEvent<ProjectHeroImageUpdatedEventData>;

type ProjectEventData =
    | ProjectCreatedEventData
    | ProjectImageUploadedEventData
    | ProjectHeroImageUpdatedEventData;
export type ProjectEventType = ProjectEventData['type'];

export type ProjectEvent = BaseProjectEvent<
    ProjectCreatedEventData | ProjectImageUploadedEventData | ProjectHeroImageUpdatedEventData
>;

export type ProjectEventItem = { uuid: string; type: ProjectEventType; date: Date };

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
    events: ProjectEventItem[];
};
export type Project = CreatedProject;

export type ProjectCreateData = Omit<ProjectCreatedEventData, 'type'> & {
    userId: string;
    image: Blob | null;
};
export type ProjectImageUploadData = {
    userId: string;
    projectUuid: string;
    image: Blob;
    date: Date;
    isDefault: boolean;
};
export type ProjectHeroImageUpdateData = {
    projectUuid: string;
    newHeroImageUuid: string;
    date: Date;
};
export type ProjectFilter = { userId?: string; uuid?: string };
