/**
 * 验证密码：非空6-18位
 * @param value
 * @returns {*}
 */
const validatePassword = (value) => {
  const reg = /^[0-9a-zA-Z]{6,18}$/
  if (value === null || value.length === 0) {
    return '密码不能为空';
  } else if (!reg.test(value)) {
    return '请输入6-18位的英文或数字';
  }
  return false;
};

/**
 * 表单验证
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
const validatePasswordForm = (rule, value, callback) => {
  const msg = validatePassword(value);
  if (msg) {
    return callback(rule.message || msg);
  }
  callback();
};

/**
 * 验证确认密码
 * @type {function(*)}
 */
const valdateConfirmPassword = (psd, confirmPsd) => {
  const psdMsg = validatePassword(psd);
  const cpsdMsg = validatePassword(confirmPsd);

  if (psdMsg) {
    return psdMsg;
  }

  if (cpsdMsg) {
    return cpsdMsg;
  }

  if (psd !== confirmPsd) {
    return '密码和确认密码必须相等';
  }

  return false;
};

const comparePsd = (oldPsd, psd) => {
  if (oldPsd === psd) {
    return '新旧密码不能相等';
  }
  return false;
};

const validateAgeForm = (rule, value, callback) => {
  const regNum = /^[0-9]{1,2}$/;
  if (!regNum.test(value)) {
    return callback(rule.message || '年龄只能在0 至 99 之间的数字');
  }
  callback();
};

const validateTelForm = (rule, value, callback) => {
  const regNum = /^1[34578]\d{9}$/;
  if (!regNum.test(value)) {
    return callback(rule.message || '手机号格式不正确');
  }
  callback();
};

/**
 * 字符串最大长度
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
const strMaxLength = (rule, value, callback) => {
  if (value && value.length > rule.max) {
    return callback(rule.message || `不得超过${rule.max}字符`);
  }
  callback();
};
export {
  validatePassword, validatePasswordForm,
  valdateConfirmPassword, comparePsd,
  validateAgeForm, validateTelForm,
  strMaxLength
};
