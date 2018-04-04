<template>
  <div class="single-main">
  <div class="edit-wrap">
    <Form :model="form" :rules="rules" ref="ref">
      <div class="edit-item">
        <FormItem prop="real_name" label="姓名">
          <Input type="text" v-model.trim="form.real_name" :maxlength="10" class="input-gray" placeholder="请输入姓名"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="age" label="年龄">
          <Input type="text" v-model.trim="form.age" :maxlength="4" class="input-gray" placeholder="请输入年龄"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="sex" label="性别">
          <RadioGroup  v-model="form.sex">
            <Radio label="1" >男</Radio>
            <Radio label="2" >女</Radio>
          </RadioGroup >
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="mobile" label="电话">
          <Input type="text" v-model.trim="form.mobile" class="input-gray" :maxlength="11" placeholder="请输入电话号码"/>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="user_type" label="类别" >
          <Select v-model="form.user_type" :disabled="id !=''">
            <Option value="1">管理员</Option>
            <Option value="2">用户</Option>
            <Option value="3">责任人</Option>
          </Select>
        </FormItem>
      </div>
      <!-- 管理员才有权限 -->
      <div class="edit-item" v-if="form.user_type == '1'">
        <FormItem prop="rule" label="权限">
          <CheckboxGroup  v-model="form.rule">
            <Checkbox :label="1" >我的设备</Checkbox>
            <Checkbox :label="2" >报警信息</Checkbox>
            <Checkbox :label="4" >统计分析</Checkbox>
            <Checkbox :label="8" >设备管理</Checkbox>
            <Checkbox :label="16" >系统设置</Checkbox>
          </CheckboxGroup >
        </FormItem>
      </div>
      <div class="edit-item" v-if="form.user_type == '3'">
        <FormItem prop="level" label="级别">
          <Select v-model="form.level" placeholder="请选择级别">
            <Option value="1">第一级</Option>
            <Option value="2">第二级</Option>
            <Option value="3">第三级</Option>
            <Option value="4">第四级</Option>
            <Option value="5">第五级</Option>
          </Select>
        </FormItem>
      </div>
      <div class="edit-item" v-if="form.user_type == '3'">
        <FormItem prop="device_str" label="设备">
            <textarea type="text" readonly="readonly" v-model.trim="form.device_str_label" class="input-gray input-zrr" placeholder="请选择设备">
              {{form.device_str_label}}
            </textarea>
          <span class="add-icon" @click="devicePicker.visiable=true">
              <Icon type="plus"></Icon>
            </span>
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="address" label="地址">
          <Input type="text" v-model.trim="form.address" class="input-gray" placeholder="请输入地址"/>
          <!--<input type="text" readonly="readonly" @click="pickerVisiable = true" v-model="form.address" class="input-gray" placeholder="请输入地址"/>-->
        </FormItem>
      </div>
      <div class="edit-item">
        <FormItem prop="email" label="邮箱">
          <Input type="text" v-model="form.email" class="input-gray" placeholder="请输入邮箱地址"/>
        </FormItem>
      </div>
      <div class="edit-bottom">
        <span><dt-button type="gray" class="largeBtn" :icon="false" @click="handleBack">返回</dt-button></span>
        <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
      </div>
    </Form>
    <!-- 经纬度 -->
    <div v-if="pickerVisiable">
      <Modal
        v-model="pickerVisiable"
        title="地址选择器"
        width="632px"
        @on-ok="handlePickerOk"
      >
        <pickerAddress ref="pickerAddress"  :latitude="form.latitude"  :longitude="form.longitude"/>
      </Modal>
    </div>
    <!-- 设备 -->
    <div v-if="devicePicker.visiable">
      <Modal
        title="选择设备"
        v-model="devicePicker.visiable"
        width="60%"
      >
        <device-selector ref="selector" :userId="id"></device-selector>
        <div slot="footer">
          <i-button type="text" size="large" @click.native="deviceCancel">取消</i-button>
          <i-button type="primary" size="large" :loading="devicePicker.buttonLoading" @click.native="deviceOk">确定</i-button>
        </div>
      </Modal>
    </div>
  </div>
  </div>
</template>

<script>
  import pickerAddress from '../../../components/pickerAddress.vue';
  import { getValue } from '../../../common/utils';
  import { validateAgeForm, validateTelForm } from '../../../common/validatorTool';
  import deviceSelector from './deviceSelector.vue';
  import dao from '../dao';

  export default {
    name: '',
    data() {
      return {
        pickerVisiable: false,
        devicePicker: {
          visiable: false,
          buttonLoading: false
        },
        id: '', // 被编辑的用户id
        form: {
          uid: '',
          real_name: '',
          age: '',
          sex: '1',
          mobile: '',
          user_type: '',
          address: '',
          latitude: '',
          longitude: '',
          email: '',
          rule: [],
          device_str: '',
          device_str_label: '',
          level: ''
        },
        rules: {
          real_name: [
            { required: true, message: '姓名不能为空', whitespace: true }
          ],
          age: [
            { required: true, message: '年龄不能为空', whitespace: true },
            { validator: validateAgeForm}
          ],
          mobile: [
            { required: true, message: '电话不能为空'},
            { validator: validateTelForm}
          ],
          sex: [
            { required: true, message: '性别不能为空'}
          ],
          level: [
            { required: true, message: '性别不能为空'}
          ],
          user_type: [
            { required: true, message: '管理类别不能为空'}
          ],
          address: [
            { required: true, message: '地址不能为空' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', whitespace: true },
            { type: 'email', message: '邮箱格式不正确' }
          ]
        }
      };
    },
    created() {
      const params = this.$routeP.params || {};
      const { id, currName } = params;
      this.form.user_type = currName || '1';
      if (id) {
        this.id = id;
        this.loadUserInfo();
      }
    },
    methods: {
      async loadUserInfo() {
        const uid = this.id;
        const type = this.form.user_type;
        const info = await dao.get_user_info({ uid, type });
        if (info) {
          let { uid, real_name, age, sex, mobile, address, email, rule, level, device_str_label = '', device_str = '' } = info;
          level = (level && level !== '0') ? level : '1';
          let ruleCode = rule ? parseInt(rule) : 0;
          const ruleArr = this.getRuleArr(ruleCode);

          this.form.uid = uid;
          this.form.real_name = real_name;
          this.form.age = age;
          this.form.sex = sex;
          this.form.mobile = mobile;
          this.form.address = address;
          this.form.email = email;
          this.form.rule = ruleArr;
          this.form.level = level;
          this.form.device_str = device_str;
          this.form.device_str_label = device_str_label;
        }
      },
      getRuleArr(ruleCode) {
        // 解析rule
        const arr = [1, 2, 4, 8, 16];
        const rule = [];
        arr.forEach((val) => {
          if (ruleCode & val) {
            rule.push(val);
          }
        });
        return rule;
      },
      handlePickerOk() {
        const data = this.$refs.pickerAddress.getPositionResult();
        console.info(data);
        this.form.address = data.address;
        this.form.latitude = getValue(data.position, 'lat');
        this.form.longitude = getValue(data.position, 'lng');
      },

      handleOk() {
        this.$refs.ref.validate((ok) => {
          if (ok) {
            if (!this.id) {
              this.addUser();
            } else {
              this.editUser();
            }
          }
        });
      },
      async addUser() {
        const params = Object.assign({}, this.form);
        const { user_type, rule } = params;
        if (user_type !== '3') {
          let ruleNum = 0;
          if (rule && rule.length > 0) {
            ruleNum = rule.reduce((a, b) => a + b);
          }

          params.rule = ruleNum;
        }
        const rs = await dao.add_info(params);
        if (rs) {
          this.handleBack();
        }
      },
      async editUser() {
        console.info('edit:', this.form);
        const { uid, real_name, age, sex, mobile, address, email, rule, user_type } = this.form;
        if (user_type !== '3') {
          // 保存用户或者管理员
          let ruleNum = 0;
          if (rule && rule.length > 0) {
            ruleNum = rule.reduce((a, b) => a + b);
          }
          const params = { uid, real_name, age, sex, mobile, email, address, rule: ruleNum };
          const rs = await dao.edit_user_info(params);
          if (rs) {
            this.handleBack();
          }
        } else {
          const { uid, real_name, age, sex, mobile, address, email, device_str, level } = this.form;
          const params = { id: uid, real_name, age, sex, mobile, address, email, device_str, level };
          const rs = await dao.edit_person_info(params);
          if (rs) {
            this.handleBack();
          }
        }
      },
      handleBack() {
        // this.$emit('on-back');
        this.$router.go(-1);
      },

      deviceCancel() {
        this.devicePicker.visiable = false;
      },

      deviceOk() {
        const data = this.$refs.selector.getSelection();
        this.form.device_str = data.value;
        this.form.device_str_label = data.label;
        this.devicePicker.visiable = false;
      }
    },
    mounted() {
    },
    components: {
      pickerAddress, deviceSelector
    }
  }
</script>

<style>
  .input-zrr{
    width: 100%;
    height: 143px !important;
    overflow-y: auto;
    resize: none;
  }

  .add-icon{
    position: absolute;
    right: 30px;
    bottom: 20px;
    width: 51px;
    height: 51px;
    border-radius: 50%;
    background-color: #E3EDFF;
    color: #74A7FF;
    cursor: pointer;
  }

  .add-icon:active{
    background-color: #cad3e3;
    color: #74A7FF;
  }

  .add-icon i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
</style>
