<template lang="pug">
nav.nav
  el-row
    el-col.logo-container(:span="12")
      img.logo(src="../../public/img/logo.png")
      span.tilte {{ $t('sysName') }}
    el-col.user(:span="12")
      div.userinfo
        div.welcome-content
          p.content.welcome {{ $t('welcome') }}
          p.content.username {{ store.user.name }}

        // 設定zone
        span.dropdown
          // @command對應下方,點後傳遞字串info | logout參數給handleDropDown
          el-dropdown(trigger="click" @command="handleDropDown")
            span.el-dropdown-link
              el-icon
                arrow-down
            template(#dropdown)
              el-dropdown-menu
                el-dropdown-item(command="info") {{ $t('userInfo') }}
                el-dropdown-item(command="set") {{ $t('setting') }}
                el-dropdown-item(command="logout") {{ $t('logOut') }}
</template>

<script setup lang="ts">
  import { 
    ref, 
    reactive, 
    inject,
    onUpdated
  } from 'vue'
  // 引入pinia
  import { useAuthStore } from '../store'
  // router
  import router from '../router';
  // 切換lang
  import { useI18n } from 'vue-i18n'

  // 處理reload
  const reload = inject<any>('reload')
  const store = useAuthStore();
  const { locale, t } = useI18n()

  const handleDropDown = (item:string) => {
    switch (item) {
      case "info":
        showUserInfo();
        break;
      case "set":
        console.log('設定 ~~')
        break;
      case "logout": // 登出
        logout();
        break;
      default:
        break;
    }
  }
  // 展示個人信息
  const showUserInfo = () => {
    router.push({path: "/userInfo"})
  }
  // 登出
  // 清除local & pinia => isAuthenticated為false, 清除user訊息
  const logout = () => {
    localStorage.removeItem('memberInfo');

    store.setAuth(false); // 設定isAuthenticated false
    store.setUser(null); // 清除pinia用戶資訊

    router.push({path: '/login'});

    setTimeout(() => {
      // @ts-ignore 不檢測ts
      ElMessage({
        message: t('isLogout'),
        type: 'error',
      })
    }, 200)
  }

  onUpdated(() => {
    console.log('!!!!!', langKey.value)
  })
</script>

<style scoped>
</style>
