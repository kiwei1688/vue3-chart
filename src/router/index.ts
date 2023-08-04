import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import i18n from '../plugins/i18n'
const { global: { t } } = i18n
// import { useAuthStore } from '../store'
// const router = useRouter();
// const store = useAuthStore()

// 定義路由
const routes: Array<RouteRecordRaw> = [
  { // 首頁
    path: "/", 
    name: "Home",
    redirect: "/index",
    // @ts-ignore
    component: () => import("../views/Home.vue"),
    meta: {
      title: t('index')
    },
    children: [ // 主區塊 container
      {
        path: "index", // 登入後 主頁
        // @ts-ignore
        component: () => import("../views/container/index.vue"),
        meta: {
          title: t('index')
        },
      },
      {
        path: "/userInfo", // 用戶信息 page
        // @ts-ignore
        component: () => import("../views/container/userInfo.vue"),
        meta: {
          title: t('userInfo')
        },
      },
      {
        path: "/setting", // 設定
        // @ts-ignore
        component: () => import("../views/container/setting.vue"),
        meta: {
          title: "設定"
        },
      },
      {
        path: "/fundList", // 資金管理 / 資金流水
        // @ts-ignore
        component: () => import("../views/manager/fundList.vue"),
        meta: {
          title: t('moneyList.managements')
        },
      },
      {
        path: "/fundList2", // 資金管理 / 金融貸款
        // @ts-ignore
        component: () => import("../views/manager/fundList2.vue"),
        meta: {
          title: "金融貸款"
        },
      },
      {
        path: "/fundList3", // 資金管理 / 金融服務
        // @ts-ignore
        component: () => import("../views/manager/fundList3.vue"),
        meta: {
          title: "金融服務"
        },
      },
      {
        path: "/infoShow", // 信息管理 / 個人信息
        // @ts-ignore
        component: () => import("../views/personMem/infoShow.vue"),
        meta: {
          title: "個人信息"
        },
      },
      {
        path: "/infoShow2", // 信息管理 / 個人資訊
        // @ts-ignore
        component: () => import("../views/personMem/infoShow2.vue"),
        meta: {
          title: "個人資訊"
        },
      },
      {
        path: "/members1", // 會員管理 / 會員列表
        // @ts-ignore
        component: () => import("../views/members/members1.vue"),
        meta: {
          title: "會員列表"
        },
      },
      {
        path: "/members2", // 會員管理 / 日誌查詢
        // @ts-ignore
        component: () => import("../views/members/members2.vue"),
        meta: {
          title: "日誌查詢"
        },
      }
    ]
  },
  { // 註冊
    path: "/register",
    name: "Register",
    // @ts-ignore
    component: () => import("../views/Register.vue"),
    meta: {
      title: "註 冊"
    },
  },
  { // 登入
    path: "/login",
    name: "Login",
    // @ts-ignore
    component: () => import("../views/login.vue"),
    meta: {
      title: "登 入"
    },
  },
  { // 404
    path: "/:catchAll(.*)", 
    name: "404",
    // @ts-ignore
    component: () => import("../views/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(), // 採用history模式 router不會有#
  routes
})

// 路由守衛
router.beforeEach((to, from, next) => {
  //這裡可以加 i18n
  document.title = to.meta.title ? `Roy-${to.meta.title}` : 'Roy'
  // document.title = `Roy -We${to.meta.title}` ? `Roy -Web` : 'Roy'
  // const isLogin:Boolean = localStorage.token ? true : false;
  const { token } = JSON.parse(localStorage.getItem('memberInfo') || '{}');

  if(to.path === '/login' || to.path === '/register') {
    next()
  } else {
    // 驗證是否有token
    token ? next() : next('/login')
  }
})

export default router