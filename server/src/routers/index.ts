/* eslint-disable import/prefer-default-export */
import { router } from '../trpc';
import { usersRouter } from './users';

export const appRouter = router({
  users: usersRouter,
});
