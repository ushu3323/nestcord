import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { comparePassword } from '../utils/hash';
import { getConfig } from '../config';

export const usersRouter = router({
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
      const config = getConfig();
      const user = await db.user.findUnique({
        where: { username: input.username },
      });

      if (!user || !(await comparePassword(input.password, user.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Username or password invalid',
        });
      }

      const { id, username } = user;
      const token = jwt.sign({ id, username }, config.jwt.tokenKey, config.jwt.defaultSignOptions);
      return { token };
    }),
});
