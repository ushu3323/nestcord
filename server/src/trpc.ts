import { initTRPC } from '@trpc/server';

const t = initTRPC.create({
  errorFormatter: ({ shape }) => shape,
});

export const { router } = t;

export const publicProcedure = t.procedure;
