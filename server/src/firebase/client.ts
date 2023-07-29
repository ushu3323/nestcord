/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp, FirebaseApp } from 'firebase/app';
import url from 'node:url';
import {
  getAuth,
  signInWithCustomToken,
  updateEmail,
  sendEmailVerification as firebaseSendEmailVerification,
  Auth,
  connectAuthEmulator,
} from 'firebase/auth';
import axios from 'axios';
import { getConfig } from '../config';

class ClientSingleton {
  private clientApp: FirebaseApp = null!;

  private clientAuth: Auth = null!;

  get app() { return this.clientApp; }

  get auth() { return this.clientAuth; }

  initialize() {
    this.clientApp = initializeApp({
      apiKey: getConfig().firebase.apiKey,
      projectId: 'nestcord',
    });
    this.clientAuth = getAuth();
    this.clientAuth.setPersistence({
      type: 'NONE',
    });

    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
      connectAuthEmulator(this.clientAuth, process.env.FIREBASE_AUTH_EMULATOR_HOST);
    }
  }
}

const clientApp = new ClientSingleton();

export const { app, initialize } = clientApp;
export default clientApp;

function generateVerifyURL(lang: string, oobCode: string, apiKey: string, continueUrl: string) {
  // const url = new URL('/users.verify', `http://localhost:${process.env.PORT}`);
  const config = getConfig();
  return url.format({
    protocol: 'http',
    host: `localhost:${config.port}`,
    pathname: '/verify-email',
    query: {
      mode: 'verifyEmail',
      oobCode,
      apiKey,
      continueUrl,
      lang,
    },
  });
}

export async function sendVerificationEmail(customToken: string, email: string) {
  const config = getConfig();

  const credential = await signInWithCustomToken(clientApp.auth, customToken);
  await updateEmail(credential.user, email);
  await firebaseSendEmailVerification(credential.user);

  if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    type OobObject = { email: string, requestType: string, oobCode: string, oobLink: string };
    type Payload = { oobCodes: OobObject[] };
    const { data } = await axios.get<Payload>('/emulator/v1/projects/nestcord/oobCodes', {
      baseURL: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    });
    const oobCode = data.oobCodes.find((value) => value.email === email);
    if (oobCode) {
      const verifyURL = generateVerifyURL('en', oobCode?.oobCode, config.firebase.apiKey, '');
      console.log(`Verify link for "${email}": `, verifyURL);
    }
  }
}
