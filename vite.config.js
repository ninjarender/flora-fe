import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://flora-be.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
