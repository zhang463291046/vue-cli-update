import HIO from '../../common/HIO';
import { tip } from '../../common/utils';

export default {
  /**
   * 添加dut
   * @param params
   * @returns {Promise.<*>}
   */
  async add_dtu(params) {
    const rs = await HIO.post('device/add_dtu', params);
    return tip(rs, '添加成功！', () => {
      return rs;
    });
  },

  /**
   * 删除dtu
   * @param id
   * @returns {Promise.<void>}
   */
  async del_dtu(id) {
    const rs = await HIO.post('device/del_dtu', { id });
    return tip(rs, '删除DTU成功！', () => {
      return rs;
    });
  },

  /**
   * 添加设备
   * @param params
   * @returns {Promise.<*>}
   */
  async add_device(params) {
    const rs = await HIO.post('device/add_device', params);
    return tip(rs, '添加设备成功！', () => {
      return rs;
    });
  },

  /**
   * 删除设备
   * @param id
   * @returns {Promise.<void>}
   */
  async del_devicel(id) {
    const rs = await HIO.post('device/del_device', { id });
    return tip(rs, '删除设备成功！', () => {
      return rs;
    });
  },

  /**
   * 添加主机
   * @param params
   * @returns {Promise.<*>}
   */
  async add_master(params) {
    const rs = await HIO.post('device/add_master', params);
    return tip(rs, '添加主机成功！', () => {
      return rs;
    });
  },

  /**
   * 删除主机
   * @param id
   * @returns {Promise.<void>}
   */
  async del_master(id) {
    const rs = await HIO.post('device/del_master', { id });
    return tip(rs, '删除主机成功！', () => {
      return rs;
    });
  },

  /**
   * 获取设备信息
   * @param id
   * @returns {Promise.<*>}
   */
  async get_device_info(id) {
    const rs = await HIO.post('device/get_device_info', { id });
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 获取设备通道
   * @param id
   * @returns {Promise.<*>}
   */
  async channel_info(id) {
    const rs = await HIO.post('device/channel_info', { id });
    return tip(rs, null, () => {
      return rs.data;
    });
  },

  /**
   * 编辑通道信息
   * @param id
   * @param channelStr
   * @returns {Promise.<*>}
   */
  async edit_channel_info(id, channelStr) {
    const rs = await HIO.post('device/edit_channel_info', { id, channel_info: channelStr });
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },

  /**
   * 添加阈值
   * @param id
   * @param temp_type
   * @param temp
   * @param hum_type
   * @param hum
   * @returns {Promise.<*>}
   */
  async add_threshold(id, temp_type, temp, hum_type, hum) {
    const rs = await HIO.post('device/add_threshold', { id, temp_type, temp, hum_type, hum });
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  }
}
