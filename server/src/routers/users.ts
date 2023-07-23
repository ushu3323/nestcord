import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { comparePassword } from '../utils/hash';

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
  register: publicProcedure
    .input(z.object({
      username: z.string().min(6),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const user = await db.user.register(input);
      return user;
    }),
  auth: publicProcedure
    .input(z.object({
      username: z.string().nonempty({ message: 'Field required' }),
      password: z.string().nonempty({ message: 'Field required' }),
    }))
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const user = await db.user.findUnique({
        where: { username: input.username },
      });

      if (!user || !(await comparePassword(input.password, user.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Username or password invalid',
        });
      }

      const { id, username, email } = user;
      return {
        id,
        email,
        username,
      };
    }),
});
