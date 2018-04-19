import Cookies from 'js-cookie';
import { encrypt, decrypt } from './gibberish';
import { Message } from 'iview';
/**
 * 结果集提示
 * @param rs
 * @param successMsg
 * @param callback
 * @returns {*}
 */
const tip = function(rs, successMsg, callback) {
  if (rs) {
    if (rs.errcode !== 0) {
      showTip('warning', rs.errmsg);
    } else {
      if (successMsg) {
        showTip('success', successMsg);
      }
      return callback && callback();
    }
  }
};

/**
 * Message全局配置基本属性
 */
Message.config({
  top: 40,
  duration: 1.5
})

/**
 * 单纯提示
 * @param type
 * @param message
 * @param duration
 * @param position
 */
const showTip = function(type = 'info', message) {
  Message[type](message);
};

const setSessionStorage = function(key, value) {
  let lastValue = value;
  if (typeof value === 'object') {
    lastValue = JSON.stringify(value);
  }
  sessionStorage.setItem(key, lastValue);
};

const getSessionStorage = function(key) {
  let value = sessionStorage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (e) {
  }

  return value;
};

const removeSessionStorage = function(key) {
  sessionStorage.removeItem(key);
};

const setCookie = function(key, value, options = {}) {
  let lastValue = value;
  if (typeof value === 'object') {
    lastValue = JSON.stringify(value);
  }
  lastValue = encrypt(lastValue);
  Cookies.set(key, lastValue, options);
};

const getCookie = function(key) {
  let value = Cookies.get(key);
  if (value) {
    value = decrypt(value);
  }

  try {
    value = JSON.parse(value);
  } catch (e) {
  }
  return value;
};

const removeCookie = function(key) {
  Cookies.remove(key);
};

/**
 * 获取对象的值
 * @param Obj
 * @param key
 * @param defaultVal
 * @returns {string}
 */
const getValue = function(Obj, key, defaultVal = '') {
  return (Obj && Obj[key]) ? Obj[key] : defaultVal;
};

/**
 * 获取地址栏参数
 * @returns {{}}
 */
const getLocationSearchMap = function() {
  let querys = location.search;
  if (querys.indexOf('?') === 0) {
    querys = querys.substring(1, querys.length);
  }
  const array = querys.split('&');
  const params = {};
  array.forEach(function(str) {
    const arr = str.split('=');
    params[arr[0]] = arr[1];
  });

  return params;
};

/**
 * 扁平化遍历对象
 * @param obj
 * @param fn
 */
const forEachValue = function (obj, fn) {
  Object.keys(obj).forEach(function (key, i) { return fn(obj[key], key, i); });
};

export {
  tip, showTip,
  setSessionStorage, getSessionStorage, removeSessionStorage,
  getValue, forEachValue,
  getLocationSearchMap,
  removeCookie, setCookie, getCookie
};
