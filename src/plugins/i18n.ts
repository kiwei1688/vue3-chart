import { createI18n } from 'vue-i18n'
import zh from '../lang/zh-TW.json' // 繁體
import cn from '../lang/zh-CN.json' // 簡體
import en from '../lang/zh-EN.json' // 英文

type MessageSchema = typeof zh

// 語系設置
const i18n = createI18n<[MessageSchema], 'zh-TW' | 'zh-CN' | 'zh-EN'>({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: localStorage.getItem('lang') || 'zh-TW', // 預設
  fallbackLocale: 'zh-TW',
  globalInjection: true, // 全域使用i18n
  messages: {
    'zh-TW': zh,
    'zh-CN': cn,
    'zh-EN': en
  }
})

export default i18n

