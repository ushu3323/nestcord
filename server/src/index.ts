import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router } from './trpc';
import { usersRouter } from './routers';

const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

const port = Number.parseInt(process.env.PORT || '3000', 10);

// eslint-disable-next-line no-console
server.server.listen(port, () => { console.log('[tRPC] HTTP server listening at port:', port); });
