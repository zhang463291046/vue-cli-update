<template>
  <div class="main">
    <dt-slideMenu/>
    <div class="main-header">
      <div class="main-left">
        <ColorPicker v-model="color" @on-change="colorChange"/>
        <Poptip trigger="hover" placement="bottom" width="100px">
          <span class="user">{{lang}}</span>
          <div class="tips" slot="content">
            <div class="tip-item" @click="changeLocale('zh','中文')">中文</div>
            <div class="tip-item" @click="changeLocale('en','English')">English</div>
          </div>
        </Poptip>
      </div>
      <div class="main-title">vue-cli管理系统</div>
      <div class="main-right">
        <Poptip trigger="hover" placement="bottom-end" width="100px">
          <span class="user">{{userInfo.name||'VUEX管理员'}}</span>
          <div class="tips" slot="content">
            <div class="tip-item" @click="handleRouter('user-index')">用户信息</div>
            <div class="tip-item" @click="handleRouter('user-index2')">修改密码</div>
            <div class="tip-item" @click="handleLogout">退出登录</div>
          </div>
        </Poptip>
      </div>
    </div>
    <div class="main-body">
      <transition name="singlePage">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
    
    },
    data() {
      return {
        color: '#2d8cf0',
        originalStyle: '',
        lang: '中文',
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      this.getIndexStyle();
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length
      })
    },
    methods: {
      getIndexStyle () {
        // 此处请求地址需要特别注意
        this.getFile('https://unpkg.com/iview/dist/styles/iview.css').then(({ data, url }) => {
          this.originalStyle = data;
        })
      },
      getFile (url) {
        return new Promise((resolve, reject) => {
          const client = new XMLHttpRequest()
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              resolve({
                data: client.response,
                url: client.responseURL
              })
            } else {
              reject(new Error(client.statusText))
            }
          }
          client.open('GET', url)
          client.send()
        })
      },
      colorChange(value){
        this.writeNewStyle();
      },
      writeNewStyle () {
        // 换肤色大概思路:
        // 第一种方式,引进全部样式,正则匹配修改对应的样式值
        // 第二种方式,通过判断,加载预先配置好的不同的样式文件
        // 第三种方式,通过修改配置文件less的变量值,待研究中
        let cssText = JSON.parse(JSON.stringify(this.originalStyle));
        let colors = {
          '#2d8cf0':this.color,
          '#2db7f5':this.color,
          '#17233d':this.color,
        }
        Object.keys(colors).forEach(key => {
          cssText = cssText.replace(new RegExp(key, 'g'), colors[key])
        })
        if (this.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style')
          style.innerText = cssText
          document.head.appendChild(style)
        } else {
          document.head.lastChild.innerText = cssText
        }
      },
      changeLocale(locale,lang){
        this.$i18n.locale = locale;
        this.lang = lang;
      },
      handleLogout(){
        this.$router.push({'name':'login'});
        console.log('---退出登录---');
      }
    },
    
  };
</script>

<style lang="less">
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1200px;
  }
  .main-header{
    z-index: 1;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 60px;
    padding-left: 200px;
    box-shadow: 0 2px 1px 1px hsla(0,0%,39%,0.1);
    background: #2d8cf0;
    .main-icon{
      display: inline-block;
      .ivu-btn-text{
        color: #FFF;
        &:hover{
          color: #FFF
        }
      }
    }
    .main-title{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #FFF;
      font-size: 20px;
    }
    .main-left {
      position: absolute;
      top: 20px;
      left: 220px;
      height: 20px;
      line-height: 20px;
      color: #FFF;
      font-size: 14px;
    }
    .main-right {
      position: absolute;
      top: 20px;
      right: 20px;
      height: 20px;
      line-height: 20px;
      color: #FFF;
      font-size: 14px;
    }
    .user{
      cursor: pointer;
    }
    .tips{
      color: #333;
      text-align: center;
      .tip-item{
        padding: 5px 0px;
        cursor: pointer;

        &:hover{
          color: #f29100;
        }
      }
    }
  }
  .main-body{
    position: absolute;
    left: 200px;
    top: 60px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    background-color: #f0f0f0;
    transition: left .3s;
  }
</style>
