import { createApp, reactive } from 'vue'
import Loading from '../components/loading.vue'

const divDom = document.createElement('div')
divDom.setAttribute('class', 'loading-container')

const options = reactive({
  showToast: true,
  txt: 'Loading.....'
})

//部位options 是向Loading 組件傳遞的參數
const $loading= createApp(Loading, {options}).mount(divDom)

const loadPlugin = {
  // 控制顯示loading的方法,show方法傳入的對象
  show(txt: any) {
    options.showToast = true
    options.txt = txt
    document.body.appendChild($loading.$el)
  },
  // loading hide
  hide() {
    options.showToast = false
  }
}

export default {
  install(app:any) {
    // 3.0的全域掛載
    app.config.globalProperties.$loading = loadPlugin
  }
}