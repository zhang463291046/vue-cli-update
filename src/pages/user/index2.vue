<template>
  <Card>
    <p slot="title"><Icon type="person"></Icon>修改密码</p>
    <Form class="pageForm" ref="form" :model="formData" :label-width="100" label-position="right" :rules="rules">
      <FormItem label="原密码" prop="oldPass">
        <Input v-model="formData.oldPass" placeholder="请输入现在使用的密码" ></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPass">
        <Input v-model="formData.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
      </FormItem>
      <FormItem label="确认新密码" prop="rePass">
        <Input v-model="formData.rePass" placeholder="请再次输入新密码" ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width: 100px;" @click="handleSubmit">保存</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        formData: {
          oldPass: '',
          newPass: '',
          rePass: '',
        },
        rules: {

        }
      };
    },
    mounted () {
      
    },
    methods: {
      handleSubmit () {

      }, 
    },
  };
</script>

<style lang="less" scoped>
  
</style>

