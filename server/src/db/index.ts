import { Prisma, PrismaClient } from '@prisma/client';
import userExtension from './extensions/user';

type LogLevel = Prisma.LogLevel;

const logLevels: LogLevel[] = process.env.NODE_ENV === 'production'
  ? ['error']
  : ['warn', 'error'];

export const prisma = new PrismaClient({
  log: logLevels,
});

export const client = prisma.$extends(userExtension);
