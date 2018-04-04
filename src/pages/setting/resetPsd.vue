<template>
  <div class="single-main">
    <div class="single-bar">
      <div class="left">
        <dt-back />
      </div>
    </div>
    <div class="edit-wrap">
      <Form :model="form" :rules="rules" ref="form" label-position="left" :label-width="100">
        <FormItem prop="oldPassword" label="原始密码">
          <Input type="password" v-model="form.oldPassword" class="input-gray" placeholder="请输入原始密码"/>
        </FormItem>
        <FormItem prop="password" label="新密码">
          <Input type="password" v-model="form.password" class="input-gray" placeholder="请输入新密码"/>
        </FormItem>
        <FormItem prop="confirmPassword" label="确认新密码">
          <Input type="password" v-model="form.confirmPassword" class="input-gray" placeholder="请输入确认密码"/>
        </FormItem>
        <div class="edit-bottom">
          <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import dtBack from '../../components/dtBack';
  import dtButton from '../../components/dtButton';
  import { validatePasswordForm } from '../../common/validatorTool';
  import cdao from '../commonDao';
  import { encrypt } from '../../common/gibberish';
  export default {
    name: '',
    data() {
      const psdValidator = (rule, value, callback) => {
        this.$refs.form.validateField('confirmPassword');
        callback();
      };
      const confirmPsdValidator = (rule, value, callback) => {
        if (value !== this.form.password) {
          return callback(rule.message || '两次输入密码不一致');
        }
        callback();
      };
      const validateOldPsd = (rule, value, callback) => {
        if (value === this.form.password) {
          return callback(rule.message || '新旧密码不能相同');
        }
        callback();
      };

      return {
        form: {
          password: '',
          confirmPassword: '',
          oldPassword: ''
        },
        rules: {
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validatePasswordForm, trigger: 'blur' },
            { validator: psdValidator }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: confirmPsdValidator }
          ],
          oldPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            { validator: validatePasswordForm, trigger: 'blur' },
            { validator: validateOldPsd, trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      handleOk() {
        this.$refs.form.validate((ok) => {
          console.info(ok)
          if (ok) {
            const pada = {
              old_pwd: encrypt(this.form.oldPassword),
              pwd:encrypt(this.form.password),
              repwd:encrypt(this.form.confirmPassword),
            }
            const params = Object.assign({}, pada);
              // params.birthday = params.birthday.Format('yyyy-MM-dd');
            const rs = cdao.modify_pwd(params);
            //修改密码成功后退出登录
            if (rs) {
              cdao.login_out();
            }
            //  this.$router.go(-1);
          }
        });
      }
    },

    mounted() {
    },

    components: {
      dtBack, dtButton
    }
  }
</script>

<style>
</style>
