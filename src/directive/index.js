/* 
*注册全局自定义指令
*/
import Vue from 'vue'
import focus from './focus'

const object = {
    focus: focus
};

Object.keys(object).forEach(key => {
  Vue.directive(key, object[key]);
});


