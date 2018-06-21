/* ====所有的验证方式==== */
import {Notice, Message} from 'element-ui';

/**
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
    con: '不能为空'
  },
  phone: {
    validate: vData => {
      return /^1[0-9]{10}$/.test(vData);
    },
    con: '格式不正确'
  },
  email: {
    validate: vData => {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(vData);
    },
    con: '格式不正确'
  },
  account: { // 账号
    validate: vData => {
      return /^\w{3,15}$/.test(vData);
    },
    con: '为3到15位字母或数字'
  },
  password: { // 密码
    validate: vData => {
      return /^\w{6,18}$/.test(vData);
    },
    con: '必须为6-18位字母或数组'
  },
  phoneDim: {
    validate: vData => {
      return /^\d{1,11}$/.test(vData);
    },
    con: '必须为数字'
  },
  greaterZero: {
    validate: vData => {
      return /^[1-9]\d*$/.test(vData);
    },
    con: '必须为正整数'
  }
};

const Validate = (params) => {
  for (let key1 = 0; key1 < params.length; key1++) {
    let _item = params[key1]; // ['password', '126', '密码', 'trim|password']
    let _vCon = _item[1]; // 需要验证的内容
    let _vErrTip = _item[2]; // 错误提示的内容
    let _vRegArr = _item[3].split('|'); // 需要验证的规则
    for (let key2 = 0; key2 < _vRegArr.length; key2++) {
      let _vRegName = _vRegArr[key2]; // 验证规则名字
      /**
       * options 必须写在首位
       * 首先判断是否包含options
       * 如果是options就立刻判断空验证，如果为空跳出本次循环
       */
      if (_vRegName === 'options') { // 'options|empty|account'
        let _vEmptyReturn = RegConfig['empty'].validate(_vCon);
        if (!_vEmptyReturn) { // options选项时，如果为空就跳出判断
          break;
        }
      } else {
        let _vReturn = RegConfig[_vRegName].validate(_vCon);
        if (!_vReturn) {
          // Vue.prototype.$message.warning(_vErrTip + RegConfig[_vRegName].con);
          Message.warning(_vErrTip + RegConfig[_vRegName].con);
          return false;
        }
      }
    }
  }
  return true;
};

export default Validate
