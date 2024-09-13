export type AsyncFn<T extends (...args: any[]) => unknown = () => void> = (
    ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>;
