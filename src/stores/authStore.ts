import { makeAutoObservable } from 'mobx';
import { loginRequest, logoutRequest } from '../services/authService';
import { webSocketManager } from '../setup/WebSocketManager';
import { objectsStore } from './objectsStore';

class AuthStore {
  isAuthorized = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async checkAuth() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      this.isAuthorized = data.authorized;

      if (data.authorized) {
        webSocketManager.connect();
      }
    } catch {
      this.isAuthorized = false;
    }
  }

  async login(code: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await loginRequest(code);
      this.isAuthorized = true;
      webSocketManager.connect();
    } catch (e: unknown) {
      this.error = e instanceof Error ? e.message : 'Invalid code';
    }

    this.isLoading = false;
  }

  async logout() {
    this.isLoading = true;

    webSocketManager.close();

    try {
      await logoutRequest();
    } catch (e) {
      console.warn('Logout error:', e);
    }

    objectsStore.reset();

    this.isAuthorized = false;
    this.error = null;
    this.isLoading = false;
  }

  setUnauthorized() {
    this.isAuthorized = false;
    this.error = null;
  }
}

export const authStore = new AuthStore();
