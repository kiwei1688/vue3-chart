<template lang="pug">
el-row.menu-container
  el-col(:span="24")
    el-menu.el-menu-vertical-demo(
      active-text-color="#ffd04b" 
      background-color="#9D9D9D"
      default-active="1"
      text-color="#fff"
    )
      // 動態menu
      template(v-for="item in fullMenus" :key="item.path")
        el-sub-menu(v-if="item.children && item.children.length > 0" :index="item.path")
          template(#title)
            el-icon
              // 動態icon
              component(:is="item.icon")
            span {{ item.name }}
          // 子層menu
          el-menu-item-group
            router-link(
              v-for="(childItem, index) in item.children"
              :key="index"
              :index="childItem.path"
              :to="childItem.path"
            )
              el-menu-item
                el-icon
                  // 動態icon
                  component(:is="childItem.icon")
                span {{ childItem.name }}
        // 沒有子層menu
        router-link(v-else :to="item.path")
          el-menu-item(:index="item.path")
            el-iconHomeFilled.icons
            span {{ item.name }}

</template>

<script type="module" setup lang="ts">
  import { ref, reactive, computed, } from 'vue'
  // 處理語系
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const i18n = useI18n();
  const i18nIndex = computed(() =>i18n.t("index"))
  const i18nMangerList= computed(() =>i18n.t("moneyList.mangerList"))
  const i18nManagements= computed(() =>i18n.t("moneyList.managements"))
  const i18nMenoyShow= computed(() =>i18n.t("moneyList.menoyShow"))
  const i18nFormIpt= computed(() =>i18n.t("moneyList.FormIpt"))
  const i18nUserInfo= computed(() =>i18n.t("user.Info"))
  const i18nUserPersonal= computed(() =>i18n.t("user.personal"))

  const i18nMember= computed(() =>i18n.t("member.management"))
  const i18nMemList= computed(() =>i18n.t("member.memList"))
  const i18nmemInfo= computed(() =>i18n.t("member.memInfo"))
  const i18nmenuSetting= computed(() =>i18n.t("menuSetting"))
  
  // 動態menu數據
  const menus = reactive([
    {
      icon: 'Money', // 對應element-plus icon的值
      name:  i18nIndex,
      path: '/',
    },
    {
      icon: 'Money', // 對應element-plus icon的值
      name: i18nMangerList,
      path: 'fund',
      children: [
        {
          icon: 'DocumentCopy',
          path: 'fundList',
          name: i18nManagements
        },
        {
          icon: 'Coin',
          path: 'fundList2',
          name: i18nMenoyShow
        },
        {
          icon: 'Money',
          path: 'fundList3',
          name: i18nFormIpt
        }
      ]
    },
    {
      icon: 'InfoFilled',
      name: i18nUserInfo,
      path: 'info',
      children: [
        {
          icon: 'Monitor',
          path: 'infoshow',
          name: i18nUserInfo
        },
        {
          icon: 'CreditCard',
          path: 'infoshow2',
          name: i18nUserPersonal
        },
      ]
    },
    {
      icon: 'UserFilled',
      name: i18nMember,
      path: 'members',
      children: [
        {
          icon: 'User',
          path: 'members1',
          name: i18nMemList
        },
        {
          icon: 'Memo',
          path: 'members2',
          name: i18nmemInfo
        },
      ]
    },
    {
      icon: 'Tools', // 對應element-plus icon的值
      path: 'setting',
      name: i18nmenuSetting,
    },
  ])

  // 處理sideBar 語系
  const fullMenus = computed({
    get() {
      return menus
    },
    set(newValue) {
      console.log('!!!!', newValue)
    }
  })
</script>

<style scoped>
  .menu-container {
    width: 100%;
    min-width: 175px;
    min-height: 100%;
    height: 100%;
    background-color: #ADADAD;
    z-index: 99;
  }
  .menu-container .icons {
    width: 16px;
    height: 16px;
    padding-right: 6px;
  }
  .menu-container .el-menu {
    border: none;
  }
  .menu-container .fa-margin {
    margin-right: 5px;
  }
  .menu-container .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }
  .menu-container .el-menu-vertical-demo {
    width: 35px;
  }
  .menu-container .el-sub-menu .el-menu-item {
    min-width: 175px;
    padding-left: 35px !important;
  }
  .menu-container .el-menu-item-group .el-menu-item-group__title {
    padding-left: 0;
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