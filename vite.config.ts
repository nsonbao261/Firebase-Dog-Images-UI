import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  // build: {
  //   outDir: "dist",
  // },
  // base: './'
})
