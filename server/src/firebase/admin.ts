import { initializeApp, App, applicationDefault } from 'firebase-admin/app';

class AdminSingleton {
  private adminApp: App = null!;

  get app() { return this.adminApp; }

  initialize() {
    this.adminApp = initializeApp({
      credential: applicationDefault(),
    });
  }
}

const adminApp = new AdminSingleton();

export const { app, initialize } = adminApp;

export default adminApp;
