<template>
  <div class="login">
    <div class="login-main" @keyup.enter="handleLogin">
      <div class="logo">vue-cli管理系统</div>
      <Form class="loginForm" ref="form" :model="formData" :rules="rules" :label-width="0">
        <FormItem label="" prop="username">
          <Input v-model.trim="formData.username" placeholder="请输入手机号码" :maxlength="20">
            <span slot="prepend"><Icon type="person"></Icon></span>
          </Input>
        </FormItem>
        <FormItem label="" prop="password">
          <Input v-model.trim="formData.password" placeholder="请输入密码" :maxlength="12" type="password">
            <span slot="prepend"><Icon type="locked"></Icon></span>
          </Input>
        </FormItem>
        <FormItem label="" prop="remember">
          <div class="remember">
            <Checkbox v-model="formData.remember">记住密码</Checkbox>
            <div style="cursor: pointer" @click="handleRouter('forget')">忘记密码</div>
          </div>
        </FormItem>
        <FormItem label="">
          <Button type="primary" long @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          username: '',
          password: '',
          remember: true
        },
        rules: {

        }
      }
    },
    mounted () {
      
    },
    methods: {
      handleLogin () {
        // this.$http.post('/login/do_login',{}).then( res => {

        // })
        this.$router.push({'name':'home-index'});
      }
    },
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
    background: url('../../assets/bg.png')  center center no-repeat;
    background-size: cover;
    .login-main{
      background-color: #FFF;
      position: absolute;
      width: 400px;
      height: 480px;
      left: 50%;
      top: 50%;
      margin-left: -200px;
      margin-top: -220px;
      .logo{
        width: 260px;
        font-size: 30px;
        height: 55px;
        margin: 58px auto 48px;
      }
      .loginForm{
        margin: 20px 30px;
      }
      .remember{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
