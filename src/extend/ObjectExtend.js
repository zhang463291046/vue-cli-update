/* 
*对象扩展方法 
*@方式一,直接扩展对象方法,Object.console()调用
*@方式二,扩展对象原型链方法,原型链中this为传入数据,通过param.console()调用
*@例子:
*Object.console([1,2,3]);
*[1,2,3].console('参数');
*/
Object.console = function(res) {
  console.log(res);
};
// Object.prototype.console = function(res) {
//   console.log(this);
//   console.log(res);
// };