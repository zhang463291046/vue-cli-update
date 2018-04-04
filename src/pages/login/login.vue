<template>
  <div class="login">
    <div class="login-main">
      <div class="logo">
        vue-cli管理系统
      </div>
      <Form ref="form" :model="form" :rules="rules" :label-width="0" @keyup.enter.native="doLogin">
        <div>
            <div class="login-input">
              <FormItem label="" prop="username">
                <img src="../../assets/icon_phone@3x.png" />
                <input type="phone" placeholder="请输入手机号码/邮箱" maxlength="20" v-model.trim="form.username"/>
              </FormItem>
            </div>

            <div class="login-input mt-20">
              <FormItem label="" prop="password">
                <img src="../../assets/icon_password@3x.png" />
                <input type="password" placeholder="请输入密码" maxlength="12" v-model.trim="form.password"/>
              </FormItem>
            </div>
        </div>
      </Form>

      <div class="login-remember">
        <div class="login-remember-inner">
          <Checkbox v-model="form.remember">记住密码</Checkbox>
        </div>
        <div class="login-unremember-inner">
          忘记密码
        </div>
      </div>

      <div class="login-button" @click="doLogin">登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: '',
          remember: true
        },
      }
    },

    methods: {
      doLogin () {
        
      }
    },

    mounted () {
      
    }
  };
</script>

<style lang="less" scoped>
  .login{
    min-width: 1200px;
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: url('../../assets/bg@3x.png')  center center no-repeat;
    background-size: cover ;

    .login-title{
      font-size: 36px;
      color: #7D9DD5;
      letter-spacing: 20px;
      position: absolute;
      left: 50%;
      top: 16%;
      transform: translateX(-50%);
    }

    .login-main{
      width: 400px;
      height: 480px;
      background-color: #FFF;
      position: absolute;
      left: 50%;
      margin-left: -200px;
      top: 50%;
      margin-top: -220px;

      .logo{
        display: block;
        width: 260px;
        font-size: 30px;
        height: 55px;
        margin: 58px auto 48px;
      }

      .login-input{
        background: #FFFFFF;
        border-radius: 2px;
        width: 280px;
        height: 40px;
        margin: 0 auto;
        position: relative;

        &:before{
          content: '';
          position: absolute;
          left: 40px;
          top: 0px;
          bottom: 0px;
          width: 1px;
          background: #d6d6d6;
          transform: scaleY(0.8);
        }

        img {
          position: absolute;
          width: 11px;
          height: 16px;
          left: 15px;
          top: 10px;
        }

        input{
          width: 100%;
          outline: none;
          background: transparent;
          border: none;
          height: 40px;
          line-height: 40px;
          padding-left: 52px;
          position: relative;
          font-size: 14px;
          color: #495060;
          letter-spacing: 0;
          border: 1px solid #D6D6D6;
          transition: all .5s;
          &::-webkit-input-placeholder { /* WebKit browsers */
            color: #B0B0B0;
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #B0B0B0;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #B0B0B0;
          }
          & :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #B0B0B0;
          }
          &:focus{
            border: 1px solid #74A7FF;
          }
        }
      }

      .login-remember{
        width: 280px;
        margin: 15px auto 20px;
        display: block;
        height: 20px;
        .login-remember-inner{
          float: left;
        }
        .login-unremember-inner{
          float: right;
        }
      }

      .login-button{
        width: 280px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        color: #FFF;
        background: #2d8cf0;
        // border-radius: 100px;
        cursor: pointer;
        font-size: 14px;
        user-select: none;

        &:active{
          background: #6d9cff;
        }
      }

      .login-txt{
        margin-top: 34px;
        text-align: center;
        font-size: 14px;
        color: #8093B5;
        letter-spacing: 2px;
      }
    }
  }
</style>
