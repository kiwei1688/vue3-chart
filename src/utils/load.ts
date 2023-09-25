import { createApp, reactive } from 'vue'
import Loading from '../components/loading.vue'

const divDom = document.createElement('div')
divDom.setAttribute('class', 'loading-container')

const options = reactive({
  showToast: true,
  txt: 'Loading.....'
})

const $loading= createApp(Loading, {options}).mount(divDom)

const loadPlugin = {
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
    app.config.globalProperties.$loading = loadPlugin
  }
}