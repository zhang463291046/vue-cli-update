import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'

Vue.use(Router)

//基础路由,一般不包含父组件Main
export const baseRouter = [
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: resolve => { require(['../pages/login/login.vue'], resolve); }
  }
];

//页面路由
export const pagesRouter = [
  {
    path: '/home',
    name: 'home',
    icon: 'grid',
    title: '概览',
    toName: 'home-index',
    meta: {},
    component: Main,
    noChildren: true,
    children: [
      {
        path: 'list',
        name: 'home-index',
        component: resolve => require(['../pages/home/index'], resolve)
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    icon: 'grid',
    title: '登录',
    toName: 'home-index',
    meta: {},
    component: Main,
    noChildren: false,
    children: [
      {
        path: 'list',
        name: 'home-index',
        component: resolve => require(['../pages/home/index'], resolve)
      }
    ]
  },
];

//...将一个数组转为用逗号分隔的参数序列,组装成router
export default new Router({
  routes: [
    ...baseRouter,
    ...pagesRouter,
  ]
})
