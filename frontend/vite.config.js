import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    server: {
    // 讓 Vite 監聽所有地址，以便 Docker 進行端口映射
    host: true,
    proxy: {
      // 將瀏覽器對 /api 的請求，代理到後端容器
      '/api': {
        target: 'http://backend:8000', // 指向後端服務的名稱和容器內的端口
        changeOrigin: true,
      },
    },
    // 使用輪詢模式來監聽文件變更，修復 Docker 在 Windows 上的熱更新問題
    watch: {
      usePolling: true,
    },
  },
})
