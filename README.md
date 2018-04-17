# vue-cli

> 基础框架

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录结构
├── build           		 // 项目打包基本配置
├── config           		 // 项目环境基本配置
├── dist                     // 运行npm run build指令,生产静态文件
├── node_modules             // 第三方依赖包
├── src                      // 生产目录
│   ├── ajaxAPI              // 自定义API请求
│   ├── api                  // 第三方API请求
│   ├── assets               // 图片资源
│   ├── commom               // 
│   ├── components           // 组件
│   ├── directive            // 自定义指令
│   ├── extend               // 扩展函数
│   ├── filter               // 自定义过滤器
│   ├── minxin               // 工具函数
│   ├── pages            	 // 页面位置
│   ├── plugin           	 // 
│   ├── router            	 // 路由配置
│   ├── store            	 // 状态管理树vuex
│   ├── style            	 // 样式
│   └── APP.vue              // 入口文件
│   └── main.js              // 入口文件
├── static                   // 静态文件目录,不被编译
├── test                     // 测试文件目录
├── .babelrc                 // babel配置
├── .editorconfig            // editor配置
├── .eslintignore            // eslint忽略编译规则配置
├── .eslintrc.js             // eslint编译规则配置
├── .gitignore            	 // git忽略提交文件配置
├── .postcssrc.js            // postcss配置
├── index.html        		 // 单页面的入口
├── package-lock.json        // 第三方依赖包锁定安装
├── package.json             // 第三方依赖包安装
├── README.md                // 说明文档		