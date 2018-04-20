/* 
*数组扩展方法 
*@方式一,直接扩展数组方法,通过Array.console()调用
*@方式二,扩展数组原型链方法,原型链中this为传入数据,通过param.console()调用
*@例子:
*Array.console([1,2,3]);
*[1,2,3].console('参数');
*/
Array.console = function(res) {
  console.log(res);
};
Array.prototype.console = function(res) {
  console.log(this);
  console.log(res);
};
