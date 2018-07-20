// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './browser'							//处理浏览器兼容性
import Vue from 'vue'
import iview from 'iview'
import App from './App'
import router from './router'
import store from './store'
import './api'								//第三方网络请求
import './ajaxAPI/Validate.js'				//自定义网络请求
import './components'						//自定义组件
import './directive'						//自定义指令
import './extend'							//扩展方法
import './filter'							//自定义过滤器
import './mixin'							//mixin
import './plugin'							//第三方插件
import i18n from './plugin/vue-i18n'		//多语言
import './style/index.less'					//样式
import './util'								//公共方法
Vue.use(iview)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
