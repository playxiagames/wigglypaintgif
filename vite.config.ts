import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // GitHub Pages 部署配置 - 使用自定义域名所以 base 为 '/'
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})