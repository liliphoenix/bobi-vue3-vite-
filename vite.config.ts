import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// TODO:踩坑 使用 import * as path 引入
import * as path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import babel from 'vite-plugin-babel'
import vitePluginRequire from 'vite-plugin-require'

const env = loadEnv('development', process.cwd())
export default defineConfig({
  plugins: [
    // ...
    babel(),
    vue(),
    viteMockServe({
      mockPath: path.resolve(__dirname, 'src/mock'),
      watchFiles: true,
      enable: true
    }),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    // @ts-expect-error
    vitePluginRequire.default()
  ],
  css: {
    preprocessorOptions: {}
  },
  resolve: {
    // TODO:别忘了在tsconfig.json中命名
    alias: {
      '@': path.join(__dirname, './src'),
      // prettier-ignore
      'com': path.resolve(__dirname, 'src/components'),
      // prettier-ignore
      'assets': path.resolve(__dirname, 'src/assets'),
      // prettier-ignore
      'utils': path.resolve(__dirname, 'src/utils'),
      // prettier-ignore
      'types': path.resolve(__dirname, 'src/types'),
      // prettier-ignore
      'router': path.resolve(__dirname, 'src/router'),
      // prettier-ignore
      'view': path.resolve(__dirname, 'src/view'),
      // prettier-ignore
      'api':path.resolve(__dirname, 'src/api'),
      // prettier-ignore
      'store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.js', '.cjs', '.json', '.ts', '.vue']
  },
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  server: {
    hmr: true,
    host: true, // 在局域网内进行热更新,
    proxy: {
      '/api': {
        target: env.VITE_TEST_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: env.VITE_TEST_HOST_UPLOAD,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload/, '')
      }
    }
  },
  // 配置静态资源基础路径
  base: process.env.NODE_ENV === 'development' ? '' : process.env.ASSETS_PATH,
  build: {
    outDir: './dist',
    assetsDir: './static',
    rollupOptions: {
      treeshake: false,

      output: {
        manualChunks: {
          'ant-design-vue': ['ant-design-vue']
        }
      }
    }
  }
})
