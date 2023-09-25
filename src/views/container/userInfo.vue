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
</template>

<script type="module" setup lang="ts">
  
</script>

<style scoped>

</style>