import axios from 'axios'
import router from '../router'

// 請求攔截
axios.interceptors.request.use((config:any) => {
  // 攜帶token
  const { token } = JSON.parse(localStorage.getItem('memberInfo') || '{}');
  // headers的Authorization 請求數據需帶token
  if(token) {
    config.headers.Authorization = token // 請求帶token
  }

  // 請求成功
  return config
}, (error) => { // 請求失敗
  return Promise.reject(error)
})

// 響應攔截
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  // token失效 || 不合法token 移除token 導回首頁
  const { status } = error.response

  if(status === 401) {
    localStorage.removeItem('memberInfo')

    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios