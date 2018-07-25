<template>
  <Card>
    <p slot="title"><Icon type="person"></Icon>个人信息</p>
    <Form class="pageForm" ref="form" :model="formData" :label-width="100" label-position="right" :rules="rules">
      <FormItem label="用户姓名：" prop="name">
        <Input v-model="formData.name"></Input>
      </FormItem>
      <FormItem label="用户手机：" prop="tel">
        <Input v-model="formData.tel"></Input>
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
          name: '',
          tel: '',
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
