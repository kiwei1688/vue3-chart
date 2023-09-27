import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// require('dotenv').config({ path: '.env' });

// 導入css
import '../public/css/reset.css'
import '../public/css/common.css'
import '../public/css/content.css'
import '../public/css/nav.css'

// 使用element-plus icons
import icons from './utils/icons'
// 語系
import i18n from './plugins/i18n'
// loading
import load from './utils/load'
// 引入pinia
import { createPinia } from 'pinia'
// vue3-apexcharts
import VueApexCharts from "vue3-apexcharts"

// import common from '@/utils/common'
const app = createApp(App)
// 註冊pinia
const pinia = createPinia()

// 全域使用filter
app.config.globalProperties.$filters = {
    currencyUSD(value:any) {
      return '$' + value
    }
  }

// 全域 icons組件
for(const [key,value] of Object.entries(icons)) {
    app.component(key,value)
}

// app.use(ElementPlus)
app.use(i18n)
// @ts-ignore
app.use(VueApexCharts)
app.use(load)
app.use(pinia)
app.use(router)
app.mount('#app')
