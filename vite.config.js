import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['express'],
      input: {
        main: resolve(__dirname, 'index.html'),
        server: resolve(__dirname, 'src/server.js'),
      },
      output: {
        globals: {
          express: 'express',
        },
      },
    },
  },
})
