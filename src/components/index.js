/* 
*注册全局自定义组件
*/
import Vue from 'vue'

/* 
*手动加载定义组件
*/
// import Button from './button'
// import SlidePage from './slidePage'
// const object = {
//   dt-button: Button,
//   dt-slidePage: SlidePage
// };

/* 
*循环遍历,自动加载组件,以文件名作为作为组件名
*/
const object = {};
const requireComponent = require.context('./', true, /\/\w+\/\w+\.vue$/);
requireComponent.keys().forEach(tpl => {
  const key = 'dt-' + tpl.replace(/.+\/(\w+)\.vue$/, '$1');
  object[key] = requireComponent(tpl).default;
});

Object.keys(object).forEach(key => {
	Vue.component(key, object[key]);
});