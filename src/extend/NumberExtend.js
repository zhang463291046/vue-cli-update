/* 
*数字扩展方法 
*@方式一,直接扩展数字方法,Number.console()调用
*@方式二,扩展数字原型链方法,原型链中this为传入数据,通过param.console()调用
*@例子:
*Number.console([1,2,3]);
*[1,2,3].console('参数');
*/
Number.console = function(res) {
  console.log(res);
};
Number.prototype.console = function(res) {
  console.log(this);
  console.log(res);
};
