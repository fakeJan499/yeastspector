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

export type ProjectEvent = ProjectCreatedEvent;

export type BaseProject = {
    uuid: string;
};
export type CreatedProject = BaseProject & {
    status: 'created';
    name: string;
    description: string;
    createdAt: Date;
};
export type Project = CreatedProject;

export type ProjectCreateData = Omit<ProjectCreatedEventData, 'type'> & { userId: string };
export type ProjectFilter = { userId: string };
