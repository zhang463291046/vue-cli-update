import io from '../fetch/io';
import { baseUrl, signKey } from './config';
import { showTip } from './utils';
import auth from './auth';

const md5 = require('js-md5');

// 拼接根URL
const getCompleteUrl = function (url) {
  let urlReal = url;
  if (urlReal.indexOf('http') !== 0) {
    urlReal = `${baseUrl}/${urlReal}`;
  }
  return urlReal;
};

// 全局状态码处理
const delaStatus = async function (rs) {
  let set = {};
  try {
    set = await rs;
    // 会话过期
    if (set.errcode === 400004 || set.errcode === 400006) {
      auth.doLoginOut();
    } else {
      return rs;
    }
  } catch (e) {
    console.error('请求出错:', e);
    showTip('error', '网络请求失败，请稍后重试!');
  }

  return rs;
};
// 处理数据签名和用户信息
const dealSign = function (params = {}) {
  const arr = [];
  const rtime = Date.parse(new Date());
  params.rtime = rtime;
  params.sign = '';
  Object.keys(params).forEach(function (item) {
    const val = params[item];
    if (val != null && val !== '' && typeof val !== 'object') {
      arr.push(`${item}=${params[item]}`);
    }
  });
  arr.sort();
  arr.push(`key=${signKey}`);

  const str = arr.join('&');
  const sign = md5(str);
  params.sign = sign;
  return params;
};

const HIO = {
  async get (url, params, options) {
    return delaStatus(io.get(getCompleteUrl(url), dealSign(params), 'GET', options));
  },

  async post (url, params, options) {
    return delaStatus(io.post(getCompleteUrl(url), dealSign(params), 'POST', options));
  },

  async upload (url, params) {
    return delaStatus(io.upload(getCompleteUrl(url), dealSign(params), 'POST'));
  },

  async put (url, body, options) {
    return delaStatus(io.put(getCompleteUrl(url), body, 'PUT', options));
  },
  async delete (url, body, options) {
    return delaStatus(io.delete(getCompleteUrl(url), body, 'DELETE', options));
  }
};

export default HIO;
