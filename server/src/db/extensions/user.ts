import { Prisma } from '@prisma/client';
import { encryptPassword } from '../../utils/hash';

const userExtension = Prisma.defineExtension({
  model: {
    user: {
      async register({ username, email, password }: Prisma.UserCreateInput) {
        const ctx = Prisma.getExtensionContext(this);
        return ctx.create({
          data: {
            username,
            email,
            password: await encryptPassword(password),
          },
        });
      },
    },
  },
});

export default userExtension;
