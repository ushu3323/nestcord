import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { client } from './db';
import { getConfig } from './config';

function verifyToken(token: string) {
  const config = getConfig();
  try {
    return jwt.verify(token, config.jwt.tokenKey) as { id: string, username: string };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return null;
    }
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause: err });
  }
}
export function createContext({ req }: CreateHTTPContextOptions) {
  let user;
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (token) {
    user = verifyToken(token);
  }
  return {
    db: client,
    user,
  };
}
