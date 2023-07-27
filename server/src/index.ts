/* eslint-disable no-console */
import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './routers';
import { createContext } from './context';
import { client } from './db';
import { getConfig, setupConfig } from './config';

export type AppRouter = typeof appRouter;

async function bootstrap() {
  setupConfig();
  const config = getConfig();

  console.log('[tRPC] Connecting to database...');
  try {
    await client.$connect();
    console.log('[tRPC] Succesfully connected to database');
  } catch (err) {
    console.log('[tRPC] ERROR: Could not connect to database');
    throw err;
  }

  const server = createHTTPServer({
    middleware: cors(),
    router: appRouter,
    createContext,
  });
  server.server
    // eslint-disable-next-line no-console
    .listen(config.port, () => console.log('[tRPC] HTTP server listening at port:', config.port))
    .on('close', () => { client.$disconnect(); });
}

bootstrap();
