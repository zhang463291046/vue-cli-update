function IEVersion() {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;// IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';// edge
  } else if (isIE11) {
    return 11; // IE11
  } else {
    return false;// 不是ie浏览器
  }
}

/**
 * @class 路由操作
 *    定义路由跳转，url传参与获取值等操作。
 */
const router = {
  /**
   * 路由历史操作
   */
  history: {
    /**
     * 增加路由历史记录堆栈
     *    会保持原路由历史记录,不会造成页面刷新。不能跨域。
     * @param {string} url
     *    跳转url
     * @param {object} state
     *    向目标页面传递的状态对象，目标页面通过 history.state 获取
     * @param {string}title
     *    一个简短的标题，标明将要进入的状态，建议传一个空字符串
     * @returns {void} 无
     * @example
     *    调用例子
     *    router.push('#/error401', { errorMsg: '你没有权限!' });
     */
    push (url, state, title) {
      history.pushState(state, title, url);
    },

    /**
     * 增加路由历史记录堆栈
     *    会清空路由历史记录,不会造成页面刷新。不能跨域。
     * @param {string} url
     *    跳转url
     * @param {object} state
     *    向目标页面传递的状态对象，目标页面通过 history.state 获取
     * @param {string}title
     *    一个简短的标题，标明将要进入的状态，建议传一个空字符串
     * @returns {void} 无
     * @example
     *    调用例子
     *    router.push('#/error401', { errorMsg: '你没有权限!' });
     */
    replace (url, state, title) {
      history.replaceState(state, title, url);
    }
  },

  /**
   * history实例
   *    由项目中调用注册
   */
  historyInstance: {
    history: null,
    register (history) {
      this.history = history;
    }
  },

  /**
   * 路由跳转
   * @param {string} url
   *    跳转目标路径
   * @param {Object} params
   *    跳转附带参数
   * @param {Object} options
   *    跳转配置，常用默认配置：
   *      {replace: false} -- 非replace跳转,即保持路由历史记录
   * @returns {void} 无
   */
  go (url, params, options) {
    const history = this.historyInstance.history;
    // 默认options设置
    const opts = Object.assign(
      {},
      {
        replace: false
      },
      options || {}
    );
    if (history && history.pushState) {
      if (opts.replace) {
        history.replaceState(params, url);
      } else {
        history.pushState(params, url);
      }
    } else {
      let paramString = '';
      if (params) {
        let size = 0;
        for (const key in params) {
          if (size > 0) {
            paramString += '&';
          }
          paramString = `${paramString}${key}=${params[key]}`;
          size += 1;
        }
      }
      if (location.hash !== '') {
        // location.hash = url + paramString;
        if (IEVersion()) {
          const href = location.href;
          const host = href.split('#')[0];
          const link = host + '#' + url;
          location.href = link;
          location.reload();
        } else {
          console.info('xxxxxxxxxxxxxx');
          location.hash = url + paramString;
        }
      } else {
        paramString = `?${paramString}`;
        location.href = url + paramString;
      }
    }
  }
};

export default router;
