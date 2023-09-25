import axios from 'axios'
import router from '../router'

// 請求攔截
axios.interceptors.request.use((config:any) => {
  const { token } = JSON.parse(localStorage.getItem('memberInfo') || '{}');
  if(token) {
    config.headers.Authorization = token 
  }

  // 請求成功
  return config
}, (error) => {
  return Promise.reject(error)
})

// 響應攔截
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  const { status } = error.response

  if(status === 401) {
    localStorage.removeItem('memberInfo')

    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios