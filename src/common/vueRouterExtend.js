import Router from 'vue-router';
import { setSessionStorage, getSessionStorage } from './utils';

const install = function (Vue, options) {
  Router.prototype.$push = function (location, onComplete, onAbort) {
    const key = location.name || location.path;
    const params = location.params;
    if (params) {
      setSessionStorage(key, params);
    }
    this.push(location, onComplete, onAbort);
  };

  Object.defineProperty(Vue.prototype, '$routeP', {
    get: function get() {
      let route = this._routerRoot._route;
      const key = route.name || route.path;
      if (Object.keys(route.params).length === 0) {
        const sessionParams = getSessionStorage(key);
        if (sessionParams) {
          route = Object.assign({}, route, { params: sessionParams });
        }
      }
      return route;
    }
  });
};

const plugins = {
  install
};

export default plugins;
