import Vue from "vue"
import axios from "axios"
import {Notice} from 'iview'
// import qs from 'qs'


//创建请求，公用参数配置
var http = axios.create({
  baseURL: 'http://120.24.55.58:8010/index.php',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

//闭包函数自调用
(function(){
  //添加一个请求拦截器
  http.interceptors.request.use(function(config){
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
    Notice({
      title: '请求失败',
      message: err,
      type: 'error'
    });
    return err;
  });
  
  //添加一个响应拦截器
  http.interceptors.response.use(function(response){
    //在这里对返回的数据进行处理
    const {status, statusText, data} = response;
    // 网络请求不通
    if(status != 200){
      Notice({
        title: '网络错误！',
        message: statusText,
        type: 'error'
      });
    }
    // 接口出错
    if(data.code!=0){
      Notice({
        title: '接口错误！',
        message: data.msg,
        type: 'error'
      });
    }
    return data;
  },function(err){
    Notice({
      title: '回调失败',
      message: err,
      type: 'error'
    });
    return err;
  });

  //使用axios
  Vue.prototype.$http = http;
   
})()
