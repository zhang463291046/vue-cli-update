// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iview from 'iview'
import App from './App'
import router from './router'
import store from './store'
import './api'
import './components'
import './directive'
import './extend'
import './filter'
import './mixin'
import './plugin'
import i18n from './plugin/vue-i18n'
import './style/index.less'
import './util'
import iviewArea from 'iview-area'
Vue.use(iview)
Vue.use(iviewArea)
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
