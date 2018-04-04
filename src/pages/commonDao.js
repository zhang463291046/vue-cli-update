import HIO from '../common/HIO';
import { tip } from '../common/utils';
import auth from '../common/auth';

export default {

  /**
   * 上传头像
   * @param params
   * @returns {Promise.<*>}
   */
  async uploadImg(params) {
    const rs = await HIO.upload('home/upload_img', params);
    return tip(rs, '上传成功！', () => {
      return rs.data;
    });
  },

  /**
   * 获取用户具体信息
   * @returns {Promise.<*>}
   */
  async get_info() {
    const rs = await HIO.post('home/get_info');
    return tip(rs, '', () => {
      return rs.data;
    });
  },

  /**
   * 修改用户信息
   * @param params
   * @returns {Promise.<*>}
   */
  async modify_info(params) {
    const rs = await HIO.post('home/modify_info', params);
    return tip(rs, '修改成功！', () => {
      return rs;
    });
  },

    /**
   * 修改密码
   * @param params
   * @returns {Promise.<*>}
   */
  async modify_pwd(params) {
    const rs = await HIO.post('home/modify_pwd', params);
    return tip(rs, '修改成功！', () => {
      return rs;
    });
  },
  /**
   * 注销
   * @returns {Promise.<*>}
   */
  async login_out() {
    // const rs = await HIO.post('home/login_out');
    // return tip(rs, '', () => {
    //   auth.doLoginOut(true);
    // });
    auth.doLoginOut(true);
  },

  /**
   * 删除公告
   * @param id
   * @returns {Promise.<*>}
   */
  async noticeDelInfo(id) {
    const rs = await HIO.post('notice/del_info', { id });
    return tip(rs, '删除成功！', () => {
      return rs;
    });
  },

  /**
   * 编辑公告
   * @param params
   * @returns {Promise.<*>}
   */
  async noticeEditInfo(params) {
    const rs = await HIO.post('notice/edit_info', params);
    return tip(rs, '新增成功！', () => {
      return rs;
    });
  },

  /**
   * 获取公告内容
   * @param id
   * @returns {Promise.<*>}
   */
  async noticeGetInfo(id) {
    const rs = await HIO.post('notice/get_info', { id });
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 获取设备地图数据
   * @param type
   * @param content
   * @returns {Promise.<void>}
   */
  async device_get_list(type = '1', content = '', page = 1) {
    const rs = await HIO.post('Mydevice/get_list', { type, content, page });
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 统计分析
   * @param type
   * @param date_type
   * @param date
   * @returns {Promise.<*>}
   */
  async get_report_data(type, date_type, date) {
    const rs = await HIO.post('Statistic/get_report_data', {type, date_type, date });
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 获取设备统计信息
   * @param id
   * @param type
   * @param date
   * @param hour
   * @returns {Promise.<*>}
   */
  async device_get_report_data(id, type, date, hour) {
    const rs = await HIO.post('Mydevice/get_report_data', { id, type, hour, date });
    return tip(rs, null, () => {
      return rs.data;
    });
  }
};
