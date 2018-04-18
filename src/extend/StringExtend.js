/* 
*字符串扩展方法 
*@方式一,直接扩展字符串方法,String.console()调用
*@方式二,扩展字符串原型链方法,原型链中this为传入数据,通过param.console()调用
*@例子:
*String.console([1,2,3]);
*[1,2,3].console('参数');
*/
String.console = function(res) {
  console.log(res);
};
String.prototype.console = function(res) {
  console.log(this);
  console.log(res);
};
