import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import fullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/flora-fe/',
  plugins: [
    injectHTML(),
    fullReload('src/partials/**/*.html'),
  ],
});
