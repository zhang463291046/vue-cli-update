// 第三方插件库JS
import Vue from 'vue'
import {aesEncrypt, aesDecrypt} from './aes'
// 原型链加密方法
 Vue.prototype.aesEncrypt = aesEncrypt
// 原型链解密方法
 Vue.prototype.aesDecrypt = aesDecrypt