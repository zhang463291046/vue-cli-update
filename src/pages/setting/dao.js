import HIO from '../../common/HIO';
import { tip } from '../../common/utils';

export default {
  /**
   * 添加用户信息
   * @param params
   * @returns {Promise.<*>}
   */
  async add_info(params) {
    const rs = await HIO.post('user/add_info', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },

  async get_user_info(params) {
    const rs = await HIO.post('user/get_user_info', params);
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 编辑管理员用户
   * @param params
   * @returns {Promise.<*>}
   */
  async edit_user_info(params) {
    const rs = await HIO.post('user/edit_user_info', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },

  /**
   * 编辑责任人信息
   * @param params
   * @returns {Promise.<*>}
   */
  async edit_person_info(params) {
    const rs = await HIO.post('user/edit_person_info', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },
  /**
   * 删除责任人信息，删除用户，删除管理员
   * @param params
   * @returns {Promise.<*>}
   */
  async del_user(params) {
    const rs = await HIO.post('user/del_user', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },
  /**
   * 重置责任人，用户密码
   * @param params
   * @returns {Promise.<*>}
   */
  async reset_pwd(params) {
    const rs = await HIO.post('user/reset_pwd', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  }
}

