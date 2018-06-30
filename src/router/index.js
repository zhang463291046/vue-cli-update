import Vue from 'vue'
import Router from 'vue-router'
//src重定义为@
import Main from '@/pages/Main'

Vue.use(Router)

//基础路由,一般不包含父组件Main
export const baseRouter = [
  {
    path: '/',
    name: 'login',
    title: '登录',
    component: resolve => require(['../pages/login/login.vue'], resolve)
  }
];

/*
*页面路由,参数说明
*@path 路径
*@name 路由别名
*@icon 一级菜单图标
*@title 名字
*@toName 跳转指定二级菜单
*@component 对应组件加载
*@hasChildren 是否有二级菜单
*@children 二级菜单
*/
export const pagesRouter = [
  {
    path: '/home',
    name: 'home',
    icon: 'ios-home',
    title: '单菜单',
    toName: 'home-index',
    component: Main,
    hasChildren: false,
    children: [
      {
        path: 'index',
        name: 'home-index',
        component: resolve => require(['../pages/home/index'], resolve)
      }
    ]
  },
  {
    path: '/home2',
    name: 'home2',
    icon: 'ios-gear',
    title: '多菜单',
    toName: 'home2-index',
    component: Main,
    hasChildren: true,
    children: [
      {
        path: 'index',
        name: 'home2-index',
        title: 'mockjs模拟数据',
        component: resolve => require(['../pages/home2/index'], resolve)
      },
      {
        path: 'index2',
        name: 'home2-index2',
        title: 'aes加密和解密',
        component: resolve => require(['../pages/home2/index2'], resolve)
      },
      {
        path: 'index3',
        name: 'home2-index3',
        title: '城市联级',
        component: resolve => require(['../pages/home2/index3'], resolve)
      },
      {
        path: 'index4',
        name: 'home2-index4',
        title: '多语言版',
        component: resolve => require(['../pages/home2/index4'], resolve)
      },
    ]
  },
  {
    path: '/home3',
    name: 'home3',
    icon: 'ios-gear',
    title: '常用组件封装',
    toName: 'home3-index',
    component: Main,
    hasChildren: true,
    children: [
      {
        path: 'index',
        name: 'home3-index',
        title: 'mockjs模拟数据',
        component: resolve => require(['../pages/home3/index'], resolve)
      },
      {
        path: 'index3',
        name: 'home3-index3',
        title: 'aes加密和解密',
        component: resolve => require(['../pages/home3/index2'], resolve)
      },
      {
        path: 'index3',
        name: 'home3-index3',
        title: '城市联级',
        component: resolve => require(['../pages/home3/index3'], resolve)
      },
      {
        path: 'index4',
        name: 'home3-index4',
        title: '多语言版',
        component: resolve => require(['../pages/home3/index4'], resolve)
      },
    ]
  },
];

//网络错误路由403,404,500等等页面
export const errRouter = [
  {
    path: '/*',
    name: 'error-404',
    title: '404-页面不存在',
    component: resolve => require(['../pages/errorPage/404.vue'], resolve)
  },
  {
    path: '/403',
    name: 'error-403',
    title: '403-权限不足',
    component: resolve => require(['../pages/errorPage/403.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error-500',
    title: '500-服务端错误',
    component: resolve => require(['../pages/errorPage/500.vue'], resolve)
  },
];

//...将一个数组转为用逗号分隔的参数序列,组装成router
export default new Router({
  routes: [
    ...baseRouter,
    ...pagesRouter,
    ...errRouter,
  ]
})
