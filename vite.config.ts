import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// element plus 自動導入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
  // 根據當前工作目錄中的 `mode` 加載 .env 文件
  // 設置第三個參數為 '' 來加載所有環境變量，而不管是否有 `VITE_` 前綴。

  // npm run dev --> env.development
  // npm run build --> env.production
  const env = loadEnv(mode, process.cwd())
  console.log('終端機印出 =====', env.VITE_API_URL)
  return {
    plugins: [
    vue(),
    AutoImport({ // 自動導入element plus 減少載入資源
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue-i18n',
      ]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ],
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      }
    },
    // 配置反向代理解決跨域問題
    server: {
      // proxy: {
      //   "/api": "https://www.thenewstep.cn/backend/8007"
      // }
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/store/, '') 
        }
      }
    }
  }
})
