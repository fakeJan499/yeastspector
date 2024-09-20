type AllowedPrimitives =
    | boolean
    | number
    | bigint
    | string
    | symbol
    | void
    | null
    | undefined
    | Date
    | Buffer
    | Function // eslint-disable-line @typescript-eslint/ban-types
    | RegExp;

export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends AllowedPrimitives
          ? T[P]
          : T[P] extends object
            ? RecursivePartial<T[P]>
            : T[P];
};
