import { setSessionStorage, getSessionStorage, removeSessionStorage, showTip } from './utils';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from './gibberish';
import HIO from './HIO';
import router from './routerUtil';

const WhiteList = ['/', '/login', '/403', '/404'];

const auth = {
  needAuth: true,  // 是否开启权限验证
  routerMap: null,

  checkLogin: async (to, next) => {
    console.info('checkLogin');
    if (auth.needLogin(to)) {
      setSessionStorage('lastUrl', to.path);
      const autoLogin = await auth.autoLogin();
      if (!autoLogin) {
        next({path: '/'});
      } else {
        next();
      }
    } else {
      auth.checkNextAuth(to, next);
    }
  },

  needLogin: (to) => {
    if (!auth.loggedIn() && WhiteList.indexOf(to.path) === -1) {
      return true;
    }
    return false;
  },
  loggedIn: () => {
    // const flag = getSessionStorage('user_login_flag');
    const flag = Cookies.get('user_login_flag');
    return !!flag;
  },

  doLogin: (defaultPath, userInfo) => {
    let path = getSessionStorage('lastUrl');
    removeSessionStorage('lastUrl');
    // setSessionStorage('userInfo', userInfo);
    // setSessionStorage('user_login_flag', true);

    let str = JSON.stringify(userInfo);
    str = encrypt(str);

    Cookies.set('userInfo', str);
    Cookies.set('user_login_flag', true);

    if (auth.needAuth) {
      path = auth.getCanVisiablePath(path, defaultPath);
    }
    console.info('path:', path);
    // 获取用户有权限的第一个界面
    const roles = userInfo.roles || [];
    if (auth.needAuth && roles && roles[0]) {
      const nextPath = auth.routerMap[roles[0]];
      if (Object.prototype.toString.call(nextPath) === '[object Array]') {
        path = nextPath[0];
      }
    }
    router.go(path || defaultPath);
  },

  doLoginOut: (flag) => {
    removeSessionStorage('lastUrl');
    // removeSessionStorage('userInfo');
   // setSessionStorage('user_login_flag');
    Cookies.remove('userInfo');
    Cookies.remove('user_login_flag');
    router.go('/');
    // !flag && showTip('warning', '用户会话过期!');
  },

  autoLogin: async (needRemember = true, lastUrl = '') => {
    const flag = localStorage.getItem('remember');
    if (needRemember && !flag) {
      return false;
    }
    const rs = await HIO.post('user/auto_login');
    if (rs.errcode === 0 || rs.errcode === '0') {
      const userInfo = rs.data;
      auth.doLogin(lastUrl, userInfo);
    }
  },

  getLocationUser () {
    let str = Cookies.get('userInfo');
    if (str) {
      str = decrypt(str);
      auth.userInfo = JSON.parse(str);
    }

    return auth.userInfo;
  },

  /**
   * 根据菜单路由，生成name->path 映射
   * @ TODO 只支持两级路由
   * @param appRouter
   */
  initRouteAuth(appRouter) {
    const routerMap = {};
    appRouter.forEach((item) => {
      const level1 = item.path;
      if (!routerMap[item.name]) {
        routerMap[item.name] = [];
      }
      routerMap[item.name].push(item.path);
      if (item.children.length > 1) {
        item.children.forEach((child) => {
          if (!routerMap[child.name]) routerMap[child.name] = [];
          routerMap[child.name].push(level1 + '/' + child.path);
        });
      } else if (item.children.length === 1) {
        if (!routerMap[item.children[0].name]) routerMap[item.children[0].name] = [];
        routerMap[item.children[0].name].push(level1 + '/' + item.children[0].path);
      }
    });
    auth.routerMap = routerMap;
  },

  initSubAuth(children) {
    const routerMap = auth.routerMap;
    children.forEach((child) => {
      const key = child.meta.menuName;
      if (!routerMap[key]) routerMap[key] = [];
      routerMap[key].push('/' + child.path);
    });

    console.info('init routerMap successful:', auth.routerMap);
  },

  /**
   * @param path 浏览器地址栏手动输入地址
   * @param defaultPath 登录成功理论跳转地址
   * @returns {*} 实际允许跳转地址
   */
  getCanVisiablePath(path, defaultPath) {
    // 判断当前访问的页面，是否有权限
    const userInfo = auth.getLocationUser() || {};
    const roles = userInfo.roles || [];
    let lastPath = path || defaultPath;
    let tempKey = null;
    // 遍历 name:path 的数据,通过正则判断当前路径是否有对应的name
    Object.keys(auth.routerMap).some((key) => {
      const child = auth.routerMap[key];
      return child.some((path) => {
        const reg = new RegExp('^\\' + path + '(?:\\/(?=$))?$');
         // const reg = new RegExp('^\\' + auth.routerMap[key] + '.*$');
        const rs = lastPath.match(reg);
        if (rs) {
          tempKey = key;
          return true;
        }
      });
    });
    console.info('tempKey:', tempKey);
    // 有则判断是否有权限
    if (tempKey && roles.indexOf(tempKey) !== -1) {
      return path;
    } else if (!tempKey) {
      return false;
    } else {
      return '/403';
    }
  },

  checkNextAuth(to, next) {
    if (!auth.needAuth) {
      next();
      return;
    }
    let path = to.path;
    if (WhiteList.indexOf(to.path) === -1) {
      path = auth.getCanVisiablePath(null, path);
      next({path});
    } else {
      next();
    }
  }

};

export default auth;
