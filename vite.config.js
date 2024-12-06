import { resolve } from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd())

  if (mode === 'production') {
    dotenv.config({ path: '.env' })
  }
  else if (mode === 'test') {
    dotenv.config({ path: '.env.test' })
  }
  else {
    dotenv.config({ path: '.env.development' })
  }

  return {
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          dir: 'dist',
        },
      },
    },
    publicDir: 'public',
  }
})
