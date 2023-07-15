import { client } from './db';

export function createContext() {
  return {
    db: client,
  };
}
