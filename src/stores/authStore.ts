import { makeAutoObservable } from 'mobx';
import { loginRequest, logoutRequest } from '../services/authService';

class AuthStore {
  isAuthorized = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(code: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await loginRequest(code);
      this.isAuthorized = true;
    } catch (e: unknown) {
      this.error = e instanceof Error ? e.message : 'Invalid code';
    }

    this.isLoading = false;
  }

  async logout() {
    this.isLoading = true;

    try {
      await logoutRequest();
    } catch (e) {
      console.warn('Logout error:', e);
    }

    this.isAuthorized = false;
    this.error = null;
    this.isLoading = false;
  }
}

export const authStore = new AuthStore();
