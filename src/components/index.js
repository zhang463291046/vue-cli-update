/* 
*注册全局组件
*/
import Vue from 'vue'
/* 
*第三方组件
*/
import iviewArea from 'iview-area'
Vue.use(iviewArea)

/* 
*自定义组件
*/

/* 
*手动加载定义组件
*/
// import button from './button'
// import slidePage from './slidePage'
// const object = {
//   button,
//   slidePage
// };

/* 
*循环遍历,自动加载组件,以文件名作为作为组件名
*/
const object = {};
const requireComponent = require.context('./', true, /\/\w+\/\w+\.vue$/);
requireComponent.keys().forEach(tpl => {
  const key = tpl.replace(/.+\/(\w+)\.vue$/, '$1');
  object[key] = requireComponent(tpl).default;
});

Object.keys(object).forEach(key => {
	console.log('自定义组件','dt-' + key);
	Vue.component('dt-' + key, object[key]);
});