import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@pages/auth': '/src/pages/auth',
      '@enums': '/src/enums',
      '@services': '/services',
      '@modals': '/src/components/Modals'
    },
  },
})
