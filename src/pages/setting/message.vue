<template>
  <div class="edit-wrap">
    <Form :model="form" :rules="rules" ref="ref">
      <div class="edit-item">
        <FormItem prop="title" label="标题">
          <input type="text" v-model="form.title" class="input-gray" placeholder="请输入标题"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="sendee" label="接收人">
          <input type="text" readonly="readonly" v-model="form.sendee" class="input-gray" placeholder="请选择接收人"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="content" label="内容">
          <input type="text" v-model="form.content" class="input-gray" placeholder="请输入内容"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <div class="edit-warn">
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </div>
      <div class="edit-item">
        <FormItem prop="way" label="通知方式">
          <CheckboxGroup  v-model="form.way">
            <Checkbox label="1" >短信</Checkbox>
            <Checkbox label="2" >邮箱</Checkbox>
            <Checkbox label="3" >电脑弹窗</Checkbox>
            <Checkbox label="4" >手机APP</Checkbox>
          </CheckboxGroup >
        </FormItem>
      </div>
      <div class="edit-bottom">
        <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
      </div>
    </Form>
  </div>
</template>

<script>
  import dtButton from '../../components/dtButton';
  export default {
    name: '',
    data() {
      return {
        form: {
          title: '',
          sendee: '',
          sendee_real: [],
          content: '',
          way: []
        },
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
            { max: 20, message: '标题长度应小于20', trigger: 'blur' }
          ],
          sendee: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { max: 50, message: '内容长度应小于20', trigger: 'blur' }
          ],
          way: [
            { required: true, type: 'array', message: '接收方式不能为空', trigger: 'blur' },
            { max: 2, type: 'array', message: '不能超过两个', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleOk() {
        this.$refs.ref.validate((ok) => {

        });
      }
    },
    mounted() {
    },
    components: {
      dtButton
    }
  };
</script>

<style>
  .edit-warn{
    width: 100%;
    background-color: #F6F7FB;
    min-height: 100px;
    max-height: 150px;
    color: #F57575;
    font-size: 14px;
    padding: 10px;
  }
</style>
