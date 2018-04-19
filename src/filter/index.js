/* 
*注册全局自定义过滤器
*/
import Vue from 'vue'
import capitalize from './capitalize'

const object = {
   capitalize: capitalize
};

Object.keys(object).forEach(key => {
  Vue.filter(key, object[key]);
});