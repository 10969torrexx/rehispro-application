import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@pages/auth': '/src/pages/auth',
      '@utils': '/src/utils',
    },
  },
})
