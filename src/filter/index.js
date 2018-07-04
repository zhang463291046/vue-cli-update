/* 
*注册全局自定义过滤器
*/
import Vue from 'vue'

// 自定义过滤器
import capitalize from './capitalize'
const object = {
   capitalize,
};
Object.keys(object).forEach(key => {
	console.log('自定义过滤器',key + 'Filter');
	Vue.filter(key + 'Filter', object[key]);
});

// 下拉选择框中的配置列表,全部自动化注册成过滤器
import * as selectList from '@/components/select/selectConfig'
// 挂载$filter方法
Vue.prototype.$filter = {}
Object.keys(selectList).forEach(key => {
	console.log('自动化过滤器',key + 'Filter');
	Vue.filter(key + 'Filter', function(val) {
		var returnVale = '';
		selectList[key].forEach(item => {
			if (val === item.value) {
				returnVale = item.label;
			}
		});
		return returnVale;
	});
	Vue.prototype.$filter[key + 'Filter'] = function(val) {
		var returnVale = '';
		selectList[key].forEach(item => {
			if (val === item.value) {
				returnVale = item.label;
			}
		});
		return returnVale;
	};
});
