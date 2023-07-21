import { initTRPC } from '@trpc/server';
import z from 'zod';
import { createContext } from './context';

const t = initTRPC
  .context<typeof createContext>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof z.ZodError
              ? error.cause.format()
              : null,
        },
      };
    },
  });

export const { router } = t;

export const publicProcedure = t.procedure;
