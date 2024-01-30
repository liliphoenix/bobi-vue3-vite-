import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
  plugins: [
    // ...
    vue(),
    viteMockServe({
      mockPath: path.resolve(__dirname, 'src/mock'),
      watchFiles: true,
      enable: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/main.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      // prettier-ignore
      '@com': path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      utils: path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/type')
    },
    extensions: ['.js', '.cjs', '.json', '.ts', '.vue']
  },
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  server: {
    host: true, // 在局域网内进行热更新,
    proxy: {
      '/api': {
        target: process.env.VUE_CLIENT_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 配置静态资源基础路径
  base: process.env.NODE_ENV === 'development' ? '' : process.env.ASSETS_PATH,
  build: {
    outDir: '/dist',
    assetsDir: '/static',
    assetsInlineLimit: 4096
  }
})
