<template>
  <div class="main" :class="{shrink: !menuType}">
    <div class="main-header">
      <!-- <div class="main-logo">
        <img src="../assets/LOGO1@3x.png" />
      </div> -->
      
      <div class="main-right">
        <Poptip trigger="hover" placement="bottom-end" width="100px">
          <span class="user">{{userInfo.real_name}}</span>
          <div class="tips" slot="content">
            <div class="tip-item" @click="toSubAccount">子账号管理</div>
            <div class="tip-item" @click="toAccount">用户信息</div>
            <div class="tip-item" @click="toResetPsd">修改密码</div>
            <div class="tip-item" @click="toLogout">退出登录</div>
          </div>
        </Poptip>
      </div>
    </div>
    <div class="main-body">
      <slideMenu></slideMenu>
      <div class="panel">
        <transition name="singlePage">
          <router-view class="child-view"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import slideMenu from '../components/slideMenu';
  import navCrumb from '../components/navCrumb.vue';
  import cdao from './commonDao';
  import { mapGetters } from 'vuex';

  export default {
    name: '',
    data() {
      return {
        menuType: true
      };
    },

    methods: {
      handleToggle() {
        this.menuType = !this.menuType;
      },
      toSubAccount() {
        this.$router.$push({ name: 'subAccount' });
      },
      toAccount() {
        this.$router.$push({ name: 'account' });
      },
      toResetPsd() {
        this.$router.$push({ name: 'resetPsd' });
      },
      toLogout() {
        cdao.login_out();
      },
      async loadUser() {
        const userInfo = await cdao.get_info();
        this.$store.dispatch('setUserInfoAction', userInfo);
      }
    },

    mounted() {
      this.loadUser();
    },

    computed: {
      ...mapGetters(['userInfo'])
    },

    components: {
      slideMenu, navCrumb
    }
  };
</script>

<style lang="less">
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1200px;
  }
  .main-logo{
    padding: 8px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;

    img{
      height: 44px;
      width: auto;
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

  .shrink{
    .slide{
      width: 60px;
      overflow-x: hidden;
    }

    .panel{
      left: 60px;
    }
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

    .main-right {
      position: absolute;
      top: 20px;
      right: 20px;
      height: 20px;
      line-height: 20px;
      color: #FFF;
      font-size: 14px;
    }
  }
  .main-page{
    position: absolute;
    top: 60px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    overflow: auto;
    z-index: 1;
    transition: left .3s;
    background: #f0f0f0;
  }
  .main-switch{
    margin: 6px;
    transition: all .3s;
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
</style>
