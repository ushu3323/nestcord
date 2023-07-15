import { initTRPC } from '@trpc/server';
import { createContext } from './context';

const t = initTRPC
  .context<typeof createContext>()
  .create({
    errorFormatter: ({ shape }) => shape,
  });

export const { router } = t;

export const publicProcedure = t.procedure;
