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

// 字符串中各个字符串出现的次数
var arr = 'abcdaabc';
var info = arr.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }
// 或者
function getTimesO(str){
  var obj = {}
  str.split('').map(function(val,index){
    if(!obj[val]){
      obj[val] = 1 
    }else{
      obj[val] += 1
    }
  })
  return obj
}
// 金额格式化
function toThousands(num) {
    var potStr = '.00'
    num = (num||0).toString()
    if(num.indexOf('.') !== -1){
       potStr = num.substr(num.indexOf('.'),3)
    }
    
    var result = [ ], counter = 0;
    num = num.substring(0,num.indexOf('.')).split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('')+potStr;
}
// 防抖节流
function debounce(fn, delay, immidate){
    var timer;
    return function (){
        var that = this;
        var args = arguments;
        clearTimeout(timer)
        if(immidate){
            // 立即执行的走这里
            var doNow = !timer;
            timer = setTimeout(function(){
                timer = null
            }, delay)
            if(doNow){
                fn.apply(that, args)
            }
        }else{
            timer = setTimeout(function(){
                fn.apply(that, args)
            }, delay)
        }
        
    }
}
