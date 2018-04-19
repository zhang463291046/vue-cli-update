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

// 对象的深拷贝问题
function deepCopy(p, c){
  var c = c || {}
  for(var i in p){
    if(typeof p[i] === 'object'){
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    }else{
      c[i] = p[i]
    }
  }
  return c
}
// 对象的深拷贝问题
function deepCopy2(p, c){
  var c = c || {}
  c=JSON.parse(JSON.stringfy(p))
  return c
}
// 对象的深拷贝问题
function copyObject(orig){
  var copy = Object.create(Object.getPrototypeOf(orig))
  copyOwnPropertiesFrom(copy, orig)
  return copy
}

function copyOwnPropertiesFrom(target, source){
  Object
    .getOwnPropertyNames(source)
    .forEach(function(val){
      var desc = Object.getOwnPropertyDescriptor(source, val)
      if(typeof desc.value === 'object'){
        target[val] = copyObject(source[val])
      }else{
        Object.defineProperty(target, val, desc)
      }
    })
    return target
}
