<template>
  <div class="main">
    <dt-slideMenu/>
    <div class="main-header">
      <div class="main-left">
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
          <span class="user">{{userInfo.name}}</span>
          <div class="tips" slot="content">
            <div class="tip-item">修改密码</div>
            <div class="tip-item" @click="handleLogout">退出登录</div>
          </div>
        </Poptip>
      </div>
    </div>
    <div class="main-body">
      <div class="panel">
        <transition name="singlePage">
          <router-view></router-view>
        </transition>
      </div>
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
        lang:'中文'
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      
    },
    methods: {
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
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 60px;
    transition: padding .3s;
    box-shadow: 0 2px 1px 1px hsla(0,0%,39%,.1);
    z-index: 20;
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
      right: 150px;
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
  .panel{
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
