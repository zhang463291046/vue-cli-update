<template>
  <div class="single-main">
     <div class="edit-wrap">
       <Form :model="form" :rules="rules" ref="ref">
           <div class="edit-item">
             <FormItem prop="title" label="标题">
               <Input type="text" v-model.trim="form.title" class="input-gray" placeholder="请输入标题" :maxlength="20"/>
             </FormItem>
           </div>
           <div class="edit-item">
             <FormItem prop="content" label="内容">
               <textarea v-model.trim="form.content" class="input-gray textarea-gray" placeholder="请输入内容" :maxlength="250"></textarea>
             </FormItem>
           </div>

           <div class="edit-item">
             <FormItem prop="expire_time" label="过期时间">
               <br/>
               <DatePicker v-model="form.expire_time" :options="options" format="yyyy/MM/dd HH:mm:ss" type="datetime"  placeholder="请选择过期时间" style="width: 243px"></DatePicker>
             </FormItem>
           </div>

         <div class="edit-bottom">
           <span><dt-button :icon="false" type="gray" @click="handleBack">返回</dt-button></span>
           <span><dt-button :icon="false" @click="handleOk">发布</dt-button></span>
         </div>
       </Form>
     </div>
  </div>
</template>

<script>
  import dtButton from '../../components/dtButton';
  import cdao from '../commonDao';

  export default {
    name: '',
    data() {
      const curr = new Date().getTime();
      return {
        options: {
          disabledDate (date) {
            return date && date < curr;
          }
        },
        id: '', // 被编辑的用户id
        form: {
          id: '0',
          title: '',
          content: '',
          expire_time: ''
        },
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
            { max: 20, message: '标题不得超过20个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { max: 250, message: '标题不得超过250个字符', trigger: 'blur' }
          ],
          expire_time: [
            { required: true, type: 'date', message: '过期时间不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      const params = this.$routeP.params || {};
      console.log(params)
      const { id } = params;
      if (id) {
        this.id = id;
        this.loadInfo();
      }
    },
    methods: {
      async loadInfo() {
        const data = await cdao.noticeGetInfo(this.id);
        if (data) {
          this.form = data
        }
      },

      handleOk() {
        this.$refs.ref.validate((ok) => {
          if (ok) {
            if (!this.id) {
              this.addNotice();
            } else {
              this.editNotice();
            }
          }
        });
      },
      async addNotice() {
        const params = Object.assign({}, this.form);
        params.expire_time = params.expire_time.Format('yyyy-MM-dd hh:mm:ss');
        const rs = await cdao.noticeEditInfo(params);;
        if (rs) {
          this.handleBack();
        }
      },
      async editNotice() {
        console.info('edit:', this.form);
        const params = Object.assign({}, this.form);
        params.expire_time = params.expire_time.Format('yyyy-MM-dd hh:mm:ss');
        const rs = await cdao.noticeEditInfo(params);;
        if (rs) {
          this.handleBack();
        }
      },
      handleBack() {
        this.$router.go(-1);
      }
    },

    components: {
      dtButton
    },

    mounted() {
    }
  };
</script>

<style>
</style>
