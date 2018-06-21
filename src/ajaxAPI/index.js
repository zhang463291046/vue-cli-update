/*
*网络请求
*/
import Vue from "vue"
import axios from "axios"
import {Notice, Message} from 'element-ui'
import qs from 'qs'
export const baseUrl = 'http://120.24.55.58:8038';
var http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

//闭包函数自调用
(function(){
  //添加一个请求拦截器
  http.interceptors.request.use(function(config){
    //在请求发出之前的数据进行处理
    config.data={
      ...config.data
    };
    //数据格式用form data
    config.data = qs.stringify(config.data);
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
    // 登录失效
    // if(data.errcode == 10000){
    //   window.location.href = 'index.html';
    //   return;
    // }
    // 接口出错
    if(data.errcode != 0){
      Message({
        type: 'warning',
        dangerouslyUseHTMLString: true,
        message: data.errmsg
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