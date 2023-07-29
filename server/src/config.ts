import z from 'zod';
import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

let config: AppConfiguration;

const processEnviromentSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  JWT_KEY: z.string().nonempty(),
  JWT_REFRESH_KEY: z.string().nonempty(),
  FIREBASE_API_KEY: z.string().nonempty(),
});

type AppConfiguration = {
  port: number,
  jwt: {
    tokenKey: string,
    refreshTokenKey: string,
    defaultSignOptions: SignOptions
  },
  firebase: {
    apiKey: string,
  }
};

export function getConfig(): AppConfiguration {
  if (!config) {
    throw new Error('Configuration is not initialized, call "setupConfig()" before accesing it');
  }
  return config;
}

export function setupConfig() {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }

  const env = processEnviromentSchema.parse(process.env);

  config = {
    port: env.PORT,
    jwt: {
      tokenKey: env.JWT_KEY,
      refreshTokenKey: env.JWT_REFRESH_KEY,
      defaultSignOptions: {
        expiresIn: '1h',
      },
    },
    firebase: {
      apiKey: env.FIREBASE_API_KEY,
    },
  };
}
