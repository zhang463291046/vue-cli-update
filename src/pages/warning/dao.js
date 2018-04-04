import HIO from '../../common/HIO';
import { tip } from '../../common/utils';

export default {
  /**
   * 警报删除
   * @param params
   * @returns {Promise.<*>}
   */
  async del_info(params) {
    const rs = await HIO.post('alert/del_info', params);
    return tip(rs, '操作成功！', () => {
      return rs;
    });
  },
  /**
   * 警报导出
   * @param params
   * @returns {Promise.<*>}
   */
  async export_list(params) {
    const rs = await HIO.post('alert/export_list', params);
    return rs;
  },
}

