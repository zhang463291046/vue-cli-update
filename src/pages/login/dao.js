import HIO from '../../common/HIO';
import auth from '../../common/auth';
import { tip } from '../../common/utils';
import { encrypt } from '../../common/gibberish';
import routerMap from '../../router/routerMap';

function mapping(sumCode) {
  let roles = [];
  routerMap.forEach((item, index) => {
    if (index === 2) {
      // @TODO 系统公告不需要拦截，因此都可以访问（此处为了保证其菜单出现的位置）
      roles.push('notice');
      roles.push('notice_index');
    }
    const code = item.code;
    if ((sumCode & code) === code) {
      roles.push(item.name);
      roles = roles.concat(item.child);
    }
  });
  roles = roles.concat(['account', 'resetPsd']); // 账户设置 和 重置密码功能，默认有
  return roles;
}

export default {
  async login(username, pwd) {
    pwd = encrypt(pwd);
    const rs = await HIO.post('login/do_login', { username, pwd });
    tip(rs, '登录成功！', () => {
      // rs.data.code = 31;
      const roles = mapping(rs.data.rule);
      rs.data.roles = roles;
      console.info('roles:', roles);
      auth.doLogin('/device', rs.data);
    });
  }
};
