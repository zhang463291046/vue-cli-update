/* 
*时间日期扩展方法 
*@方式一,直接扩展时间日期方法,Date.console()调用
*@方式二,扩展时间日期原型链方法,原型链中this为传入数据,通过param.console()调用
*@例子:
*Date.console([1,2,3]);
*[1,2,3].console('参数');
*/
Date.console = function(res) {
  console.log(res);
};
Date.prototype.console = function(res) {
  console.log(this);
  console.log(res);
};

// 时间格式转换
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  //正则替换年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  //正则替换月份、日等
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  //特殊时间
  if (fmt == '1970-01-01'|| fmt=='1970-01-01 08:00' || fmt=='1970-01-01 08:00:00') {
    fmt = '-';
  }
  return fmt;
}
