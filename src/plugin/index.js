// 第三方插件库JS
import Vue from 'vue'
// 自定义表单验证
import {validate} from './validate'
// 加密和解密
import {aesEncrypt, aesDecrypt} from './aes'
// 原型链表单验证方法
 Vue.prototype.$validate = validate
// 原型链加密方法
 Vue.prototype.$aesEncrypt = aesEncrypt
// 原型链解密方法
 Vue.prototype.$aesDecrypt = aesDecrypt