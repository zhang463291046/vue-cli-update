import Vue from "vue"
import axios from "axios"
// import qs from 'qs'
// import {Notification} from 'element-ui'

export default function () {

  //公用参数配置
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  
  //添加一个请求拦截器
  axios.interceptors.request.use(function(config){
    //在请求发出之前的数据进行处理
    var userId = '49b0559c-a383-460f-8428-b9522d05ee41';
    var menuId = '4cf6cafe8aa34e70b17379e27530a7c2';
    config.headers.zwtUserId=userId;
    config.data={
      zwtMenuId:menuId,
      ...config.data
    };
    //数据格式用form data
    // config.data = qs.stringify(config.data);
    return config;
  },function(err){
    // Notification({
    //   title: '请求失败',
    //   message: err,
    //   type: 'error'
    // });
    return err;
  });
  
  //添加一个响应拦截器
  axios.interceptors.response.use(function(response){
    //在这里对返回的数据进行处理
    const {status, statusText, data} = response;
    // 网络请求不通
    if(status != 200){
      // Notification({
      //   title: '网络错误！',
      //   message: statusText,
      //   type: 'error'
      // });
    }
    // 接口出错
    if(data.code!=0){
      // Notification({
      //   title: '接口错误！',
      //   message: data.msg,
      //   type: 'error'
      // });
    }
    return response;
  },function(err){
    // Notification({
    //   title: '回调失败',
    //   message: err,
    //   type: 'error'
    // });
    return err;
  });

  //使用axios
  Vue.prototype.$http = axios;
}