<template lang="pug">
div.info-container
  el-row.info-content(type="flex" justify="center")
    el-col(:span="6")
      div.infoUser
        img(v-if="store.user.avatar" src="../../../public/img/avatar.jpg")
        img(v-else src="../../../public/img/avatar02.jpg")

    el-col(:span="18")
      div.userinfo
        div.user-infoWrap
          div.user-item
            i.fa.fa-user
            span 姓 名 :
            span {{ store.user.name }}
          div.user-item
            i.fa.fa-envelope
            span 信 箱 :
            span roy6874ya@yahoo.com.tw
          div.user-item
            i.fa.fa-phone
            span 手 機 :
            span 0977098***
          div.user-item
            i.fa.fa-cog
            span 身 份 :
            span {{ store.user.identity === 'manager' ? '管理者' : '員 工' }}
          div.user-item
            i.fa.fa-file-text
            span 描 述 :
            span welcome come to my Vue3 website!!!
</template>

<script type="module" setup lang="ts">
import{ useAuthStore } from '../../store'
const store = useAuthStore();
  
</script>

<style scoped>

</style>