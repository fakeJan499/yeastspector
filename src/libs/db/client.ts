import { PrismaClient } from '@prisma/client';

type DbClient = Omit<
    PrismaClient,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

const prisma = new PrismaClient();

prisma.$connect();

export const run = <T>(fn: (db: DbClient) => Promise<T>): Promise<T> => fn(prisma);

export const runInTransaction = <T>(fn: (tx: DbClient) => Promise<T>): Promise<T> =>
    prisma.$transaction((tx: DbClient) => fn(tx));
