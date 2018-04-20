/*
*网络请求
*/
import Vue from "vue"
import axios from "axios"
import {Notice} from 'iview'
// import qs from 'qs'
var http = axios.create({
  baseURL: '',
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
    Notice.error({
      title: '请求失败',
      desc: err
    });
    return err;
  });
  
  //添加一个响应拦截器
  http.interceptors.response.use(function(response){
    //在这里对返回的数据进行处理
    const {status, statusText, data} = response;
    // 网络请求不通
    if(status != 200){
      Notice.error({
        title: '网络错误！',
        desc: statusText
      });
    }
    // 接口出错
    if(data.code!=0){
      Notice.error({
        title: '接口错误！',
        desc: data.msg
      });
    }
    return data;
  },function(err){
    Notice.error({
      title: '回调失败',
      desc: err
    });
    return err;
  });

  //使用axios
  Vue.prototype.$http = http;
   
})()
