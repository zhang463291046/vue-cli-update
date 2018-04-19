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
    component: resolve => { require(['../pages/login/login.vue'], resolve); }
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
    title: '目录结构1',
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
    title: '目录结构2',
    toName: 'home2-index',
    component: Main,
    hasChildren: true,
    children: [
      {
        path: 'index',
        name: 'home2-index',
        title: '结构2-1',
        component: resolve => require(['../pages/home2/index'], resolve)
      },
      {
        path: 'index2',
        name: 'home2-index2',
        title: '结构2-2',
        component: resolve => require(['../pages/home2/index2'], resolve)
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
