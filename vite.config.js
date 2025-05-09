import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import { createHtmlPlugin } from 'vite-plugin-html'
import { readFileSync } from 'fs'
import { resolve } from 'path'
const vuePkg = JSON.parse(readFileSync(resolve('./node_modules/vue/package.json'), 'utf-8'))
const vitePkg = JSON.parse(readFileSync(resolve('./node_modules/vite/package.json'), 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          vueVersion: vuePkg.version,
          viteVersion: vitePkg.version,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
