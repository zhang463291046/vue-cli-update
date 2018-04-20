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
```
├── build                    // 项目打包基本配置
├── config                   // 项目环境基本配置
├── dist                     // 运行npm run build指令,生产静态文件
├── node_modules             // 第三方依赖包
├── src                      // 生产目录
│   ├── ajaxAPI              // 自定义API请求
│   ├── api                  // 第三方API请求
│   ├── assets               // 图片资源
│   ├── components           // 自定义组件
│   ├── directive            // 自定义指令
│   ├── extend               // 扩展函数
│   ├── filter               // 自定义过滤器
│   ├── mixin                // 工具函数
│   ├── pages                // 生产页面结构目录
│   ├── plugin               // 第三方插件库JS
│   ├── router               // 路由配置
│   ├── store                // 状态管理树vuex
│   ├── style                // 样式
│   ├── util                 // 公共JS方法
│   ├── APP.vue              // 单页面的入口root vue
│   └── main.js              // 单页面的入口js,依赖注入应用
├── static                   // 静态文件目录,不被编译
├── test                     // 测试文件目录
├── .babelrc                 // babel配置
├── .editorconfig            // editor配置
├── .eslintignore            // eslint忽略编译规则配置
├── .eslintrc.js             // eslint编译规则配置
├── .gitignore               // git忽略提交文件配置
├── .postcssrc.js            // postcss配置
├── index.html               // 单页面的入口html
├── package-lock.json        // 第三方依赖包锁定安装
├── package.json             // 第三方依赖包安装
├── README.md                // 说明文档
```

## 技术说明文档
| 描述                       | 依赖包                   | 备注                      |
|----------------------------|--------------------------|---------------------------|
| 网络请求                   | axios                    |暂无                       |
| websocket通讯              | mqtt                     |暂无                       |
| 基础UI框架                 | iview                    |暂无                       |
| 报表图形统计               | vue-echarts              |暂无                       |
| 样式支持less,sass,scss     | less和less-loader支持less;node-sass和sass-loader支持sass,scss|暂无         |
| 路由配置                   | vue-router               |暂无                       |
| 状态管理树                 | vuex                     |暂无                       |
| 国际化语言库               | vue-i18n                 |暂无                       |


## 开发常用包推荐
| 描述                       | 依赖包                   |备注                       |
|----------------------------|--------------------------|---------------------------|
| 网络请求                   | axios                    |暂无                       |
| websocket通讯              | mqtt                     |暂无                       |
| 基础UI框架                 | element,iview            |暂无                       |
| 报表图形统计               | vue-echarts              |暂无                       |
| 样式支持less,sass,scss     | less和less-loader支持less;node-sass和sass-loader支持sass,scss|暂无         |
| 路由配置                   | vue-router               |暂无                       |
| 状态管理树                 | vuex                     |暂无                       |
| 国际化语言库               | vue-i18n                 |暂无                       |
| 货币转换                   | accounting               |暂无                       |

## 欢迎有兴趣的小伙伴给点提议,在Issues中留言.后期会扩展组件和JS

## TIP: coding.net和github设置同步更新
```
$git remote -v #查看当前远端仓库
origin  git@git.coding.net:user/project.git (fetch)
origin  git@git.coding.net:user/project.git (push)

$git remote add both git@git.coding.net:user/project.git #添加一个名为 both 的远端

$git push both master #提交both远端master主干
```
