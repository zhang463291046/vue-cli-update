/* 
*注册全局自定义组件
*/
import Vue from 'vue'
import Button from './button'
import SlidePage from './slidePage'

const object = {
  dtButton: Button,
  dtSlidePage: SlidePage
};

Object.keys(object).forEach(key => {
	Vue.component(key, object[key]);
});