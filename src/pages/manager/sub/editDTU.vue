<template>
  <div class="single-main">
    <div class="edit-wrap">
      <Form :model="form" :rules="rules" ref="ref">
        <div class="edit-item">
          <FormItem prop="name" label="DTU名称">
            <Input type="text" v-model.trim="form.name" class="input-gray" placeholder="请输入DTU名称" :maxlength="20"/>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="dtu_id" label="DTU ID">
            <Input type="text" v-model.trim="form.dtu_id" class="input-gray" placeholder="请输入DTU ID" :maxlength="20"/>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="sim_id" label="SIM卡">
            <Input type="text" v-model.trim="form.sim_id" class="input-gray" placeholder="请输入SIM卡号" :maxlength="20"/>
          </FormItem>
        </div>
        <div class="edit-bottom">
          <span><dt-button type="gray" class="largeBtn" :icon="false" @click="handleBack">返回</dt-button></span>
          <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import dao from '../dao';

  export default {
    name: '',
    data() {
      return {
        form: {
          id: '0',
          name: '',
          dtu_id: '',
          sim_id: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入DTU名称', whitespace: true}
          ],
          dtu_id: [
            { required: true, message: '请输入DTU ID', whitespace: true },
            {type: 'string', pattern: /^[0-9]{1,20}$/, message: '只能输入1-20位数字'}
          ],
          sim_id: [
            { required: true, message: '请输入SIM卡号', whitespace: true },
            {type: 'string', pattern: /^[0-9]{15,20}$/, message: '只能输入15-20位数字'}
          ]
        }
      }
    },


    methods: {
      handleBack() {
        // 返回
        this.$router.go(-1);
      },
      handleOk() {
        this.$refs.ref.validate(async (ok) => {
          if (ok) {
            const params = Object.assign({}, this.form);
            const rs = await dao.add_dtu(params);
            if (rs) {
              this.handleBack();
            }
          }
        });
      }
    },

    mounted() {
    }
  }
</script>

<style>
</style>
