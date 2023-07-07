import { defineStore } from 'pinia'
// TS 校驗數據type
import { userType } from '../utils/types'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false, // 是否登入(全域)
      user: {}, // 用戶
      getToken: '' // 存儲token
    }
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user
  },
  actions: {
    // 存token
    setToken(isToken:string) {
      isToken ? this.getToken = isToken : this.getToken = ''
    },
    // 處理登入state
    setAuth(isAuth:boolean) {
      isAuth ? this.isAuthenticated = isAuth : this.isAuthenticated = false
    },
    // 處理更新user (清除user信息 null)
    setUser(user: userType | null) {
      user ? this.user = user : this.user = {}
    }
  }
})