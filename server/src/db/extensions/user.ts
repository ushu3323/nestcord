import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { encryptPassword } from '../../utils/hash';

const userExtension = Prisma.defineExtension({
  model: {
    user: {
      async register({ username, email, password }: Prisma.UserCreateInput) {
        const ctx = Prisma.getExtensionContext(this);
        try {
          return await ctx.create({
            data: {
              username,
              email,
              password: await encryptPassword(password),
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
              throw new TRPCError({ message: 'An user with this email already exists', code: 'CONFLICT', cause: 'EMAIL_EXISTS' });
            }
          }
          console.error(e);
          throw e;
        }
      },
    },
  },
});

export default userExtension;
