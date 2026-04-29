import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves at https://r4mizbiz-max.github.io/vision-board/ —
// so we need the assets to resolve under that subpath.
export default defineConfig({
  base: '/vision-board/',
  plugins: [react(), tailwindcss()],
});
