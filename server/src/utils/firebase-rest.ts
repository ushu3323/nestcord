import axios from 'axios';
import { getConfig } from '../config';

export async function exchangeCustomToken(customToken: string) {
  const config = getConfig();
  const { apiKey } = config.firebase;
  type Payload = { idToken: string, refreshToken: string, expiresIn: string };
  return axios.post<Payload>(
    `?key=${apiKey}`,
    {
      token: customToken,
      returnSecureToksen: true,
    },
    {
      baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken',
    },
  );
}

export async function sendEmailVerification(idToken: string) {
  const config = getConfig();
  const { apiKey } = config.firebase;
  return axios.post(`?key=${apiKey}`, {
    requestType: 'VERIFY_EMAIL',
    idToken,
  }, {
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode',
  });
}
