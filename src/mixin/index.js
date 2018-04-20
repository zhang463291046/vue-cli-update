/*全局混入对象,会插入到每一个组件中,需要慎用*/
import Vue from 'vue'

var mixin = {  
  methods: {
    formatDate(){
      console.log('---mixin---','混入对象')
    },
  }
}

Vue.mixin(mixin)
