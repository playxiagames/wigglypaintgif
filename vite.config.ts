import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // GitHub Pages 部署配置
  base: process.env.NODE_ENV === 'production' ? '/wigglypaintgif.com/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})