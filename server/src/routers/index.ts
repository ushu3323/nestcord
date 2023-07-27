/* eslint-disable import/prefer-default-export */
import { protectedProcedure, router } from '../trpc';
import { usersRouter } from './users';

export const appRouter = router({
  users: usersRouter,
  profile: protectedProcedure
    .query(async (opts) => {
      const { db, user } = opts.ctx;
      return db.user.findUnique({
        where: { id: user.id },
        select: { id: true, email: true, username: true },
      });
    }),
});
