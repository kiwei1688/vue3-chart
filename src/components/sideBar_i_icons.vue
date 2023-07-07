<template lang="pug">
el-row.menu-container
  el-col(:span="12")
    el-menu.el-menu-vertical-demo(
      active-text-color="#ffd04b" 
      background-color="#9D9D9D"
      default-active="1"
      text-color="#fff"
    )
      el-menu-item(index="1")
        i.fa.fa-bank
        span {{ $t('index') }}

      el-sub-menu(index="2")
        template(#title)
          i.fa.fa-balance-scale
          span 資金管理
        el-menu-item-group
          el-menu-item(index="1-1") 
            i.fa.fa-bitbucket-square
            span 資金管理
          el-menu-item(index="1-2")
            i.fa.fa-money
            span 金融貸款
          el-menu-item(index="1-3")
            i.fa.fa-file-text-o
            span 金融服務

      el-sub-menu(index="3")
        template(#title)
          i.fa.fa-file-text
          span 報表管理
        el-menu-item-group
          el-menu-item(index="2-1") 
            i.fa.fa-area-chart
            span 報表列表
          el-menu-item(index="2-2")
            i.fa.fa-bar-chart
            span 報表詳細
      
      el-menu-item(index="4")
        i.fa.fa-list
        span 會員管理
</template>

<script type="module" setup lang="ts">
  
</script>

<style scoped>
  .menu-container {
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    height: 100%;
    background-color: #ADADAD;
    z-index: 99;
  }
  .menu-container .el-menu {
    border: none;
  }
  .menu-container .fa-margin {
    margin-right: 5px;
  }
  .menu-container .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 100vh;
  }
  .menu-container .el-menu-vertical-demo {
    width: 35px;
  }
  .menu-container .el-sub-menu .el-menu-item {
    min-width: 180px;
  }
  .menu-container .el-menu-item-group .el-menu-item-group__title {
    padding-left: 0;
  }
  .menu-container .el-sub-menu i,
  .menu-container .el-menu-item i,
  .menu-container .el-sub-menu .el-menu-item i
  {
    padding-right: 7px;
  }
  .menu-container .el-sub-menu,
  .menu-container .el-menu-item 
  {
    border-bottom: 1px solid #E0E0E0;
  }
   .menu-container .el-sub-menu .el-menu-item { border: unset; }
  .menu-container .hiddenDropdown,
  .menu-container .hiddenDropname {
    display: none;
  }
  .menu-container a {
    text-decoration: none;
  }
</style>