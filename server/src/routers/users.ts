import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const usersRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const users = await db.user.findMany({ select: { id: true, email: true, username: true } });
    return users;
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const { db } = ctx;
    const user = await db.user.findUnique({
      where: { id: input },
      select: { id: true, email: true, username: true },
    });
    return user;
  }),
  create: publicProcedure
    .input(z.object({ username: z.string(), email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const user = await db.user.create({ data: input });
      return user;
    }),
});
