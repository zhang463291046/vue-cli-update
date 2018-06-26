/**
 * AES加密
 * @key秘钥,可以为字符串,也可以为数组
 * aesEncrypt('123456') 加密
 * => 'Y+ahQX0nTjpYJeSHV00P0w=='
 * aesDecrypt('Y+ahQX0nTjpYJeSHV00P0w==') 解密
 * => '123456'
 */
import GibberishAES from './gibberish-aes';
// const key  = '20180514';// 秘钥字符串
const key = [105, 97, 109, 103, 97, 121, 33, 33]; // 秘钥数组
const stringKey = key => key.map(v => String.fromCharCode(v)).join(''); // ASCII码 => 字符串iamgay!!

/**
 * trueKey秘钥
 */
var trueKey;
if (typeof key === 'string') {
  trueKey = key; // aesKey是字符串
} else {
  trueKey = stringKey(key); // aesKey是数组
}

// aes加密
const aesEncrypt = item => GibberishAES.aesEncrypt(item, trueKey);
// aes解密
const aesDecrypt = item => GibberishAES.aesDecrypt(item, trueKey);

export {
	aesEncrypt,
	aesDecrypt
}