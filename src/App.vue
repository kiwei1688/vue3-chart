<script setup lang="ts">
import { 
  watchEffect, 
  onErrorCaptured,
  nextTick,
  provide,
  ref
} from 'vue'
import jwt_decode from 'jwt-decode'
import { useAuthStore } from './store'
// 型態校驗
import { userType } from './utils/types'
// element-plus lang
import { ElConfigProvider } from 'element-plus'
// import zh_cn from 'element-plus/lib/locale/lang/zh-cn'
import zh_cn from 'element-plus/es/locale/lang/zh-cn' // 解決element-plu版本編譯失敗問題

// global Loading component
import Loading from './components/loading.vue'

const store = useAuthStore()
const isRouterActive = ref<boolean>(true) // reload

// 處理頁面reload
const reload = () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
}

// 監聽 重整後更新pinia 用戶數據
watchEffect(() => {
  // 判斷local端是否有token
  const { token } = JSON.parse(localStorage.getItem('memberInfo') || '{}');
  // console.log('=======', store.getToken)
  if(token) {
    // 編譯 user信息
    const decode:userType = jwt_decode(token)
    // 更新pinia
    store.setAuth(!!decode)
    store.setUser(decode)
  }
})

// 組件調用inject的reload
provide('reload', reload)
</script>

<template>
  <!-- ElConfigProvider element-plus語系 -->
  <ElConfigProvider :locale="zh_cn">
    <router-view v-if="isRouterActive"></router-view>
  </ElConfigProvider>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
