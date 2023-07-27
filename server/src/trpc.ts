import { TRPCError, initTRPC } from '@trpc/server';
import z from 'zod';
import { createContext } from './context';

const t = initTRPC
  .context<typeof createContext>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
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

const isAuth = t.middleware(({ ctx, next }) => {
  if (ctx.user) {
    return next({ ctx: { user: ctx.user } });
  }
  throw new TRPCError({ code: 'UNAUTHORIZED' });
});

export const protectedProcedure = t.procedure.use(isAuth);
