import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP en tu red local
    port: 5173,      // Puerto en el que corre tu aplicación
  },
});
