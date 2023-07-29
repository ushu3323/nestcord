/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { applyActionCode } from 'firebase/auth';
import { appRouter } from './routers';
import { createContext } from './context';
import { client } from './db';
import { getConfig, setupConfig } from './config';
import firebaseadmin from './firebase/admin';
import clientApp from './firebase/client';

export type AppRouter = typeof appRouter;

async function bootstrap() {
  setupConfig();
  const config = getConfig();
  firebaseadmin.initialize();
  clientApp.initialize();
  console.log('[tRPC] Connecting to database...');
  try {
    await client.$connect();
    console.log('[tRPC] Succesfully connected to database');
  } catch (err) {
    console.log('[tRPC] ERROR: Could not connect to database');
    throw err;
  }

  const app = express();
  app.use(cors());
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  app.get('/verify-email', async (req, res, next) => {
    const query = req.query as any;
    try {
      await applyActionCode(clientApp.auth, query.oobCode);
    } catch (err) {
      next(err);
    }
    res.json({ query: req.query });
  });
  app.get('/currentUser', (req, res) => {
    res.json({
      user: clientApp.auth.currentUser,
    });
  });
  app
    .listen(config.port, () => {
      console.log('[tRPC] HTTP server listening at port:', config.port);
    })
    .on('close', () => { client.$disconnect(); });
}

bootstrap();
