/* 
*注册全局自定义组件
*/
import Vue from 'vue'
import Button from './button'

const object = {
  dtButton: Button
};

Object.keys(object).forEach(key => {
	Vue.component(key, object[key]);
});