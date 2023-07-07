import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element plus 自動導入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
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
    proxy: {
      "/api": "https://www.thenewstep.cn/backend/8007"
    }
  }
})
