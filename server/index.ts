import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router } from './src/trpc';
import { usersRouter } from './src/routers';

const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

const port = Number.parseInt(process.env.PORT || '3000', 10);

// eslint-disable-next-line no-console
server.server.listen(port, () => { console.log('[TRPC] HTTP server listening at port:', port); });
