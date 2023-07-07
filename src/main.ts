import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 使用element-plus icons
import icons from './utils/icons'
// 語系
import i18n from './plugins/i18n'
// loading
import load from './utils/load'
// 引入pinia
import { createPinia } from 'pinia'

const app = createApp(App)
// 註冊pinia
const pinia = createPinia()

// 全域 icons組件
for(const [key,value] of Object.entries(icons)) {
    app.component(key,value)
}

// app.use(ElementPlus)
app.use(i18n)
app.use(load)
app.use(pinia)
app.use(router)
app.mount('#app')
