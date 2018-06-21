/* ====所有的请求方法,包含验证和加密==== */
import Vue from "vue";
import apiUrl from './apiUrl';
import {Notice, Message} from 'element-ui';
import {upload} from './formdata';
import Validate from './Validate';
import { aesEncrypt, aesDecrypt } from "../plugin/aes";
const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http.post(url, params).then(response => {
      if (response.errcode != '0') { return; }
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

/* ==== http请求提示 =====  */
const SuccessTips = (con, callbck) => {
  Message.success({
    content: con
  });
  callbck && callbck();
};

/* ==== 登陆页 ==== */
const loginDoLogin = (params, callback) => {
  post(apiUrl.loginDoLogin, params).then(msg => { callback && callback(msg) })
};

/* ==== 职位管理 ==== */
const adminGetList = (params, callback) => {
  post(apiUrl.adminGetList, params).then(msg => { callback && callback(msg) })
};
const adminGetAddInfo = (params, callback) => {
  post(apiUrl.adminGetAddInfo, params).then(msg => { callback && callback(msg) })
};
const adminGetEditInfo = (params, callback) => {
  post(apiUrl.adminGetEditInfo, params).then(msg => { callback && callback(msg) })
};
const adminAddInfo = (params, callback) => {
  post(apiUrl.adminAddInfo, params).then(msg => { callback && callback(msg) })
};
const adminEditInfo = (params, callback) => {
  post(apiUrl.adminEditInfo, params).then(msg => { callback && callback(msg) })
};
const adminDelInfo = (params, callback) => {
  post(apiUrl.adminDelInfo, params).then(msg => { callback && callback(msg) })
};
/* ==== 门店管理 ==== */
const storeGetList = (params, callback) => {
  post(apiUrl.storeGetList, params).then(msg => { callback && callback(msg) })
};
const storeGetStoreType = (params, callback) => {
  post(apiUrl.storeGetStoreType, params).then(msg => { callback && callback(msg) })
};
const storeGetAreaInfo = (params, callback) => {
  post(apiUrl.storeGetAreaInfo, params).then(msg => { callback && callback(msg) })
};
const storeGetEditInfo = (params, callback) => {
  post(apiUrl.storeGetEditInfo, params).then(msg => { callback && callback(msg) })
};
const storeAddInfo = (params, callback) => {
  post(apiUrl.storeAddInfo, params).then(msg => { callback && callback(msg) })
};
const storeEditInfo = (params, callback) => {
  post(apiUrl.storeEditInfo, params).then(msg => { callback && callback(msg) })
};
const storeDelInfo = (params, callback) => {
  post(apiUrl.storeDelInfo, params).then(msg => { callback && callback(msg) })
};
/* ==== 档案管理 ==== */
const clientGetList = (params, callback) => {
  post(apiUrl.clientGetList, params).then(msg => { callback && callback(msg) })
};
const clientGetInfo = (params, callback) => {
  post(apiUrl.clientGetInfo, params).then(msg => { callback && callback(msg) })
};
/* ==== 员工管理 ==== */
const staffGetList = (params, callback) => {
  post(apiUrl.staffGetList, params).then(msg => { callback && callback(msg) })
};
const staffStaffInfo = (params, callback) => {
  post(apiUrl.staffStaffInfo, params).then(msg => { callback && callback(msg) })
};
const staffEditInfo = (params, callback) => {
  post(apiUrl.staffEditInfo, params).then(msg => { callback && callback(msg) })
};
const staffDelInfo = (params, callback) => {
  post(apiUrl.staffDelInfo, params).then(msg => { callback && callback(msg) })
};
/* ==== 设备管理 ==== */
const deviceGetList = (params, callback) => {
  post(apiUrl.deviceGetList, params).then(msg => { callback && callback(msg) })
};
/* ==== 设备维修 ==== */
const repaireGetList = (params, callback) => {
  post(apiUrl.repaireGetList, params).then(msg => { callback && callback(msg) })
};
/* ==== 库存管理 ==== */
const stockGetList = (params, callback) => {
  post(apiUrl.stockGetList, params).then(msg => { callback && callback(msg) })
};
const stockImportInfo = (params, callback) => {
  upload(apiUrl.stockImportInfo, params).then(msg => { callback && callback(msg) })
};
const object = {
  /* ==== 登陆页 ==== */
  loginDoLogin,
  /* ==== 职位管理 ==== */
  adminGetList,
  adminGetAddInfo,
  adminGetEditInfo,
  adminAddInfo,
  adminEditInfo,
  adminDelInfo,
  /* ==== 门店管理 ==== */
  storeGetList,
  storeGetStoreType,
  storeGetAreaInfo,
  storeGetEditInfo,
  storeAddInfo,
  storeEditInfo,
  storeDelInfo,
  /* ==== 档案管理 ==== */
  clientGetList,
  clientGetInfo,
  /* ==== 员工管理 ==== */
  staffGetList,
  staffStaffInfo,
  staffEditInfo,
  staffDelInfo,
  /* ==== 设备管理 ==== */
  deviceGetList,
  /* ==== 设备维修 ==== */
  repaireGetList,
  /* ==== 库存管理 ==== */
  stockGetList,
  stockImportInfo,
};

Vue.prototype.api = object;