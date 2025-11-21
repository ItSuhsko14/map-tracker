import { objectsStore } from '../stores/objectsStore';
import { authStore } from '../stores/authStore';

class WebSocketManager {
  ws: WebSocket | null = null;
  reconnectTimer: number | null = null;
  reconnectDelay = 2000;
  isManuallyClosed = false;

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    this.isManuallyClosed = false;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    this.ws = ws;

    ws.onopen = () => {
      this.clearReconnect();
      this.reconnectDelay = 2000;
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

    ws.onclose = (e) => {
      console.warn('WS closed');

      if (e.code === 4001) {
        authStore.isAuthorized = false;

        if (!this.isManuallyClosed) {
          this.scheduleReconnect();
        }
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
      this.ws.close();
      this.ws = null;
    }
  }
}

export const webSocketManager = new WebSocketManager();
