import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    // Copier .htaccess dans dist après le build
    rollupOptions: {
      output: {
        // Configuration pour optimiser le build
      },
    },
  },
  // Base path pour la production (ajustez si votre site est dans un sous-dossier)
  base: '/',
})
