import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {title: '登录'},
      component: resolve => require(['../pages/login/login'], resolve)
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: resolve => require(['../components/HelloWorld'], resolve)
    }
  ]
})
