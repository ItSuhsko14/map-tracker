import { objectsStore } from '../stores/objectsStore';
import { authStore } from '../stores/authStore';
import { runInAction } from 'mobx';

class WebSocketManager {
  ws: WebSocket | null = null;
  reconnectTimer: number | null = null;
  reconnectDelay = 2000;
  isManuallyClosed = false;

  connect() {
    // Якщо вже є активне з'єднання → виходимо
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.isManuallyClosed = false;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    this.ws = ws;

    ws.onopen = () => {
      this.clearReconnect();
      this.reconnectDelay = 2000;
      // console.log("WS connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        objectsStore.updateFromServer(data);
      } catch (err) {
        console.error('WS parse error:', err);
      }
    };

    ws.onerror = (err) => {
      console.warn('WS error:', err);
    };

    ws.onclose = (ev) => {
      console.warn('WS closed', ev.code);

      // ❗ Якщо сервер каже Unauthorized — робимо logout.
      if (ev.code === 4001) {
        runInAction(() => {
          authStore.setUnauthorized();
        });
        return; // ❗ НЕ РЕКОНЕКТИМОСЬ
      }

      if (!this.isManuallyClosed) {
        this.scheduleReconnect();
      }
    };
  }

  scheduleReconnect() {
    if (this.reconnectTimer) return;

    console.warn(`Reconnecting in ${this.reconnectDelay / 1000}s...`);

    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
      this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, 10000);
    }, this.reconnectDelay);
  }

  clearReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  close() {
    this.isManuallyClosed = true;
    this.clearReconnect();

    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;

      this.ws.close(1000, 'Logout');
      this.ws = null;
    }
  }
}

export const webSocketManager = new WebSocketManager();
