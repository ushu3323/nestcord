import type { inferFormattedError, ZodType } from 'zod';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@server/index';

export const trpc = createTRPCReact<AppRouter>();

export namespace Utils {
  export type InferFormattedError<Input extends Record<string, any>> = (
    inferFormattedError<ZodType<Input>>
  );
}
