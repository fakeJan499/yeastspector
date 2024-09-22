import { PrismaClient } from '@prisma/client';
import { DbClient } from './db-client';

const prisma = new PrismaClient();

prisma.$connect();

export const run = <T>(fn: (db: DbClient) => Promise<T>): Promise<T> => fn(prisma);

export const runInTransaction = <T>(fn: (tx: DbClient) => Promise<T>): Promise<T> =>
    prisma.$transaction((tx: DbClient) => fn(tx));
