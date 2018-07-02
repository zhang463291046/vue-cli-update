/* 
*注册全局自定义过滤器
*/
import Vue from 'vue'
// 自定义过滤器
import capitalize from './capitalize'
// 下拉选择框中的配置列表,全部注册成过滤器
import * as selectList from '@/components/select/selectConfig'
const object = {
   capitalize,
   ...selectList
};
Object.keys(object).forEach(key => {
  console.log('自定义过滤器',key + 'Filter');
  Vue.filter(key + 'Filter', object[key]);
});