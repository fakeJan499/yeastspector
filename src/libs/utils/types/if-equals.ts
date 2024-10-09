export type IfEquals<T, U, Y = true, N = false> =
    (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertTypeEquality = <T extends true>(): void => {};
