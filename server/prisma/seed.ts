/* eslint-disable no-console */
import { client } from '../src/db';

async function main() {
  const alpha = await client.user.upsert({
    where: { username: 'alpha' },
    update: {},
    create: {
      username: 'alpha',
      email: 'alpha@server.net',
      password: 'alphaPassword',
    },
  });

  const beta = await client.user.upsert({
    where: { username: 'beta' },
    update: {},
    create: {
      username: 'beta',
      email: 'beta@server.net',
      password: 'betaPassword',
    },
  });

  console.log({ alpha, beta });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
