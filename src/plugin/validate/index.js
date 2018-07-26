/* ====自定义验证方式==== */
import {Message} from 'iview'

/**验证规则:
 * empty 为空验证
 * phone 手机号验证
 * email 邮箱验证
 * password 密码验证
 * account 账号验证
 * greaterZero 正整数验证
 */
const RegConfig = {
  empty: {
    validate: vData => {
      if (vData === undefined || vData === '' || vData.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    message: '不能为空'
  },
  phone: {
    validate: vData => {
      return /^1[0-9]{10}$/.test(vData);
    },
    message: '格式不正确'
  },
  email: {
    validate: vData => {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(vData);
    },
    message: '格式不正确'
  },
  account: { // 账号
    validate: vData => {
      return /^\w{3,15}$/.test(vData);
    },
    message: '为3到15位字母或数字'
  },
  password: { // 密码
    validate: vData => {
      return /^\w{6,18}$/.test(vData);
    },
    message: '必须为6-18位字母或数字'
  },
  greaterZero: {
    validate: vData => {
      return /^[1-9]\d*$/.test(vData);
    },
    message: '必须为正整数'
  }
};

/**
*自定义验证方法
*params = [
  ['张三', '用户名', 'empty'],
  ['123456', '密码', 'empty|password'],
]
**/
const RegFuntion = (params = []) => {
  for (let key1 = 0; key1 < params.length; key1++) {
    let _item = params[key1]; // 单条数据
    let _vCon = _item[0]; // 需要验证的内容
    let _vErrTip = _item[1]; // 错误提示的内容
    let _vRegArr = _item[2].split('|'); // 需要验证的规则,多个可以用管道
    for (let key2 = 0; key2 < _vRegArr.length; key2++) {
      let _vRegName = _vRegArr[key2]; // 验证规则名字
      let _vReturn = RegConfig[_vRegName].validate(_vCon);
      if (!_vReturn) {
        Message.warning(_vErrTip + RegConfig[_vRegName].message);
        return false;
      }
    }
  }
  return true;
};

/**
*拦截验证,只有表单验证通过才继续then
**/
const validate = (params = []) => {
  var RegResult = RegFuntion(params);
  return new Promise((resolve, reject) => {
    if(RegResult){
      resolve(true)
    }
  }).then(result =>{
    return result
  })
};

export {
  validate
}