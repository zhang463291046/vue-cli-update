/*
*网络请求
*/
import Vue from "vue"
import axios from "axios"
import {Notice, Message} from 'iview'
import qs from 'qs'
// 模拟后台接口数据,若不需要,请注释
import './mock.js'
// 基础URL
const baseUrl = process.env.NODE_ENV=="production"?"/index.php/":"/index.php/";
var http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
});

//闭包函数自调用
(function(){
  //添加一个请求拦截器
  http.interceptors.request.use(function(config){
    //在请求发出之前的数据进行处理
    // 头部添加信息
    // config.headers.zwtUserId='49b0559c-a383-460f-8428-b9522d05ee41';
    // 数据添加字段
    // config.data={
    //   zwtMenuId:'4cf6cafe8aa34e70b17379e27530a7c2',
    //   ...config.data
    // };
    //将数据对象格式用QS序列化Form Data,再提交
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
    console.log(data)
    // 网络请求不通
    if(status != 200){
      Notice.error({
        title: '网络错误！',
        desc: statusText
      });
    }
    // 接口出错
    if(data.code!=0){
      Message.warning({
        content: data.errmsg
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
   
  //自定义POST请求,添加拦截功能
  Vue.prototype.$post = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      http.post(url, params).then(response => {
        if (response.code == '0') { 
          resolve(response) 
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }; 
})()
