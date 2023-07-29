import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { getAuth } from 'firebase-admin/auth';
import { publicProcedure, router } from '../trpc';
import { comparePassword } from '../utils/hash';
import { getConfig } from '../config';
import { sendVerificationEmail } from '../firebase/client';

export const usersRouter = router({
  verify: publicProcedure
    .input(z.object({
      mode: z.enum(['resetPassword', 'recoverEmail', 'verifyEmail']),
      oobCode: z.string(),
      apiKey: z.string(),
      continueUrl: z.string(),
      lang: z.string(),
    })).query(({ input, ctx }) => input),
  register: publicProcedure
    .input(z.object({
      username: z.string().min(6),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      // const user = await db.user.register(input);
      const user = await db.user.upsert({
        where: {
          email: input.email,
        },
        create: input,
        update: {},
      });

      // Replicate user in firebase so we can use email services
      const auth = getAuth();
      const custom = await auth.createCustomToken(user.id);
      await sendVerificationEmail(custom, user.email);
      const { id, email, username } = user;
      return {
        token: custom,
        user: {
          id, email, username,
        },
      };
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
