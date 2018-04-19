/*全局混入对象,会插入到每一个组件中,需要慎用*/
import Vue from 'vue'

var mixin = {  
  methods: {
    //时间戳转成日期
    formatDate(){
      console.log('11')
    },
  }
}

Vue.mixin(mixin)
