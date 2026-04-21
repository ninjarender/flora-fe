import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import fullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/flora-fe/',
  plugins: [
    injectHTML(),
    fullReload('src/partials/**/*.html'),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://flora-be.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
