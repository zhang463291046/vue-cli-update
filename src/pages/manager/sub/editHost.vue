<template>
  <div class="single-main">
    <div class="edit-wrap">
      <Form :model="form" :rules="rules" ref="ref">
        <div class="edit-item">
          <FormItem prop="type" label="设备类型">
            <dt-select type="text" clearable v-model.trim="form.type" placeholder="请选择设备类型" :options="options"/>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="name" label="主机名称">
            <Input type="text" v-model.trim="form.name" class="input-gray" placeholder="请输入主机名称"/>
          </FormItem>
        </div>
        <div class="edit-item" v-show="form.type!='5'">
          <FormItem prop="dtu_id" label="所属DTU">
            <dt-select-url url="device/get_master_dtu_list" v-model.trim="form.dtu_id" placeholder="请选择所属DTU" labelField="dtu_name" valueField="dtu_num"/>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="property" label="主机地址">
            <Input type="text" v-model.trim="form.property" class="input-gray" placeholder="请输入主机地址"/>
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
        options: [
          { label: '火灾探测器', value: '1' },
          { label: '烟感主机', value: '5' }
        ],
        form: {
          name: '',
          dtu_id: '',
          property: '',
          type: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入主机名称', whitespace: true }
          ],
          dtu_id: [
            { required: true, message: '请选择所属DTU' }
          ],
          property: [
            { required: true, message: '请输入主机地址', whitespace: true }
          ],
          type: [
            { required: true, message: '请选择设备类型' }
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
        //当为烟雾时，dtu设为0;
        if(this.form.type=='5'){
          this.form.dtu_id='0';
        }
        this.$refs.ref.validate(async (ok) => {
          if (ok) {
            const params = Object.assign({}, this.form);
            console.info(params);
            const rs = await dao.add_master(params);
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
