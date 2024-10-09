import { getEnvVariable } from '@/libs/env';
import { PrismaClient } from '@prisma/client';
import { DbClient } from './db-client';

const prismaClientSingleton = () => {
    const prisma = new PrismaClient();

    prisma.$connect();

    return prisma;
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (getEnvVariable('NODE_ENV') !== 'production') globalThis.prismaGlobal = prisma;

export const run = <T>(fn: (db: DbClient) => Promise<T>): Promise<T> => fn(prisma);

export const runInTransaction = <T>(fn: (tx: DbClient) => Promise<T>): Promise<T> =>
    prisma.$transaction((tx: DbClient) => fn(tx));
