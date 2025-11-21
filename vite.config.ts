import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['mobx', 'mobx-react-lite'],
  },
  plugins: [react()],
});
