<template>
  <Card>
    <p slot="title"><Icon type="person"></Icon>个人信息</p>
    <Form class="pageForm" ref="form" :model="formData" :label-width="100" label-position="right" :rules="rules">
      <FormItem prop="photo" label="头像">
        <Upload action="/index.php/upload/upload_file" :show-upload-list="false" :default-file-list="defaultList" accept=".png, .jpg, .jpeg, .gif" :on-success="onSuccess">
          <img :src="formData.photo|| defaultImg" class="logo" />
        </Upload>
      </FormItem>
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
        defaultImg: require('@/assets/upload.png'),
        defaultList: [],
        formData: {
          photo: '',
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
      onSuccess(response, file, fileList){
          
      },
      handleSubmit () {

      }, 
    },
  };
</script>

<style lang="less" scoped>
  
</style>
