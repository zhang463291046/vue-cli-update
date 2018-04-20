/*
*js创建ajax请求
*
*/
function ajax (url, options) {
  return new Promise((resolve, reject) => {
    let requestObj = new XMLHttpRequest();

    let sendData = '';
    if (options.method === 'POST') {
      sendData = options.body;
    }
    const ContentType = options.headers['Content-Type'];
    requestObj.open(options.method, url, true);
    if (ContentType) {
      requestObj.setRequestHeader('Content-type', options.headers['Content-Type']);
    }
    requestObj.send(sendData);

    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response;
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          resolve(obj);
        } else {
          reject(requestObj);
        }
      }
    };
  });
}

/*
*网络请求
*
*/
async function fetchCore (url, options) {
  try {
    return fetch(url, options);
  } catch (error) {
    throw new Error('fetch request failed.', error);
  }
}

/*
*网络请求
*
*/
async function requestCore (url, body, method, options) {
  const opts = options || {};
  const headers = Object.assign(
    {},
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json; charset=utf-8'
    },
    opts.headers || {}
  );

  // 默认config设置
  const config = Object.assign(
    {},
    {
      reqEvalJSON: false,
      respRedirect401: true
    },
    opts.config || {}
  );

  let requestBody = body;
  let paramsArray = [];
  if (body) {
    Object.keys(body).forEach(key => {
      let val = encodeURIComponent(body[key]);
      paramsArray.push(key + '=' + val);
    });
  }
  requestBody = paramsArray.join('&');

  if (method === 'GET') {
    if (url.search(/\?/) === -1 && requestBody !== '') {
      url = url + '?' + requestBody;
    } else {
      url = url + requestBody;
    }
    requestBody = undefined;
  } else if (config.reqEvalJSON) {
    requestBody = JSON.stringify(body);
  }
  try {
    if (window.fetch) {
      const response = await fetchCore(url, {
        method,
        headers,
        credentials: 'include',
        body: requestBody
      });
      return checkStatus(response, config);
    } else {
      const response = await ajax(url, {
        method,
        headers,
        body: requestBody
      });
      return response;
    }
  } catch (error) {
    throw error;
  }
}

async function requestUpload (url, params) {
  const data = new FormData();
  Object.keys(params).forEach(function (item) {
    data.append(item, params[item]);
  });

  try {
    if (window.fetch) {
      const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: data
      });
      return checkStatus(response);
    } else {
      const response = await ajax(url, {
        method: 'POST',
        headers: {
        },
        body: data
      });
      return response;
    }
  } catch (e) {
    throw e;
  }
}

/*
*检查状态
*
*/
async function checkStatus (response, config) {
  return response.json();
}

/*
*提供请求方法
*@get,@post,@put,@delete,@upload
*/
const io = {
  async get (url, params, options) {
    return requestCore(url, params, 'GET', options);
  },
  async post (url, params, options) {
    return requestCore(url, params, 'POST', options);
  },
  async put (url, body, options) {
    return requestCore(url, body, 'PUT', options);
  },
  async delete (url, body, options) {
    return requestCore(url, body, 'DELETE', options);
  },
  async upload (url, body) {
    return requestUpload(url, body);
  }
};

export default io;
