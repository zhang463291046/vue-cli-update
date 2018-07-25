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
        <FormItem label="" prop="code">
          <div class="code">
            <Input v-model.trim="formData.code" placeholder="请输入验证码" :maxlength="6" style="width:220px;">
              <span slot="prepend"><Icon type="locked"></Icon></span>
            </Input>
            <Button type="primary" :disabled="isSend" @click="handleSendCode">{{BtnText}}</Button>
          </div>
        </FormItem>
        <FormItem label="" prop="password">
          <Input v-model.trim="formData.password" placeholder="请输入密码" :maxlength="12" type="password">
            <span slot="prepend"><Icon type="locked"></Icon></span>
          </Input>
        </FormItem>
        <FormItem label="">
          <Button type="primary" long @click="handleSubmit">保存</Button>
        </FormItem>
        <FormItem label="">
          <Button type="text" long @click="handleRouter('login')">返回</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSend: false,
        BtnText: '获取验证码',
        formData: {
          username: '',
          password: '',
          code: ''
        },
        rules: {

        }
      }
    },
    mounted () {
      
    },
    methods: {
      handleSendCode(){
        var re = /^1[0-9]{10}$/;
        if(!re.test(this.form.username)){
          this.$Message.warning('请输入正确格式的手机号');
          return
        }
        let timeLast = 60;
        let timer = setInterval(() => {
            if (timeLast >= 0) {
                this.isSend = true;
                this.BtnText = timeLast + '秒后重试';
                timeLast -= 1;
            } else {
                clearInterval(timer);
                this.isSend = false;
                this.BtnText = '获取验证码';
            }
        }, 1000);
        // you can write ajax request here
      },
      handleSubmit () {
        this.handleRouter('login');
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
      .code{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
