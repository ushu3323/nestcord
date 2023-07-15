import { PrismaClient, Prisma } from '@prisma/client';

type LogLevel = Prisma.LogLevel;

const logLevels: LogLevel[] = process.env.NODE_ENV === 'production'
  ? ['error']
  : ['warn', 'error'];

export const client = new PrismaClient({
  log: logLevels,
});
