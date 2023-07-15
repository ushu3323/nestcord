import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './routers';
import { createContext } from './context';
import { client } from './db';

export type AppRouter = typeof appRouter;

const port = Number.parseInt(process.env.PORT || '3000', 10);
const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

server.server
  // eslint-disable-next-line no-console
  .listen(port, () => console.log('[tRPC] HTTP server listening at port:', port))
  .on('close', () => client.$disconnect);
