<template>
  <div class="single-main">
    <div class="edit-wrap">
      <Form :model="form" :rules="rules" ref="ref">
        <div class="edit-item">
          <FormItem prop="type" label="设备类型">
            <dt-select type="text" clearable v-model.trim="form.type" placeholder="请选择设备类型" :options="options" @on-change="handleTypeChange"/>
          </FormItem>
        </div>
        <div class="edit-item" v-if="showDTU">
          <FormItem prop="dtu_num" label="所属DTU">
            <dt-select-url url="device/get_master_dtu_list" v-model.trim="form.dtu_num" placeholder="请选择所属DTU" labelField="dtu_name" valueField="dtu_num"/>
          </FormItem>
        </div>
        <div class="edit-item" v-if="showHOST">
          <FormItem prop="master_id" label="主机地址">
            <dt-select-url  v-model.trim="form.master_id" url="device/get_device_master_list" clearable placeholder="请选择主机" labelField="name" valueField="id"/>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="property" label="设备地址">
            <Input type="text" v-model.trim="form.property" class="input-gray" :placeholder="placeholder_addr" :maxlength="65535" />
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="name" label="设备名称">
            <Input type="text" v-model.trim="form.name" class="input-gray" :placeholder="placeholder_name" :maxlength="18"/>
          </FormItem>
        </div>
        <div class="edit-item" v-if="showNUM">
          <FormItem prop="master_num" label="主机通道号">
            <dt-select type="text" clearable v-model.trim="form.master_num" placeholder="请选择通道号" :options="numOptions" ></dt-select>
          </FormItem>
        </div>
        <div class="edit-item">
          <FormItem prop="address" label="位置">
            <Input type="text" v-model.trim="form.address" readonly="readonly" @click.native="addrPicker.visiable = true" class="input-gray" placeholder="请选择设备位置"/>
          </FormItem>
        </div>
        <div class="edit-bottom">
          <span><dt-button type="gray" class="largeBtn" :icon="false" @click="handleBack">返回</dt-button></span>
          <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
        </div>
      </Form>
    </div>

    <div v-if="addrPicker.visiable">
      <Modal
        title="选择责任人"
        v-model="addrPicker.visiable"
        width="650px"
        @on-ok="handleAddrPickerOk"
      >
          <picker-address ref="pickerAddress" :search="true" :latitude="form.latitude"  :longitude="form.longitude"/>
      </Modal>
    </div>
  </div>
</template>

<script>
  import pickerAddress from '../../../components/pickerAddress.vue';
  import { getValue } from '../../../common/utils';
  import dao from '../dao';
  import { types } from '../../configs';
  import { strMaxLength } from '../../../common/validatorTool';

  const deviceName = '请输入设备名称';
  const deviceAddr = '请输入设备地址';
  const detectorName = '请输入探测器名称';
  const detectorAddr = '请输入探测器地址';

  export default {
    name: '',
    data() {
      return {
        placeholder_addr: deviceAddr,
        placeholder_name: deviceName,
        showDTU: false,
        showHOST: false,
        showNUM: false,
        addrPicker: {
          visiable: false
        },
        userPicker: {
          visiable: false,
          buttonLoading: false
        },
        form: {
          type: '',
          dtu_num: '',
          property: '',
          name: '',
          address: '',
          latitude: '',
          longitude: '',
          master_id: '',
          master_num: ''
        },
        rules: {
          type: [
            {required: true, message: '请选择设备类型'}
          ],
          dtu_num: [
            {required: true, message: '请输入DTU序列号'},
            {type: 'string', pattern: /^[0-9]*$/, message: '只能输入数字'}
          ],
          property: [
            {required: true, message: '请输入设备地址', whitespace: true}
          ],
          name: [
            {required: true, message: '请输入设备名称', whitespace: true}
          ],
          address: [
            {required: true, message: '请选择设备位置'}
          ],
          master_id: [
            {required: true, message: '请选择所属主机'}
          ],
          master_num: [
            {required: true, message: '请选择通道号'}
          ]
        },
        options: types,
        numOptions: [
          { label: '通道1', value: '1' }, 
          { label: '通道2', value: '2' },
          { label: '通道3', value: '3' }, 
          { label: '通道4', value: '4' },
          { label: '通道5', value: '5' }, 
          { label: '通道6', value: '6' },
          { label: '通道7', value: '7' }, 
          { label: '通道8', value: '8' }
        ]
      }
    },

    created() {
      const params = this.$routeP.params || {};
      const { id } = params;
      if (id) {
        this.id = id;
        this.loadInfo(id);
      }
    },

    methods: {
      async loadInfo(id) {
        const data = await dao.get_device_info(id);
        if (data) {
          const { id, dtu_num, type, addr, name, master_id, master_num, address, latitude, longitude, mac } = data.info;
          this.form = {
            id, dtu_num, type, name, master_id, master_num, address, latitude, longitude
          }
          if (type === '6') {
            this.form.property = mac;
          } else {
            this.form.property = addr;
          }

          this.handleTypeChange(type);
        }
      },
      handleAddrPickerOk() {
        const data = this.$refs.pickerAddress.getPositionResult();
        this.form.address = data.address;
        this.form.latitude = getValue(data.position, 'lat');
        this.form.longitude = getValue(data.position, 'lng');
      },

      handleBack() {
        // 返回
        this.$router.go(-1);
      },

      handleOk() {
        // 提交表单
        this.$refs.ref.validate(async (ok) => {
          if (ok) {
            const params = Object.assign({}, this.form);
            const { type } = this.form;
            if (type !== '2' && type !== '3' && type !== '4') {
              // 不传 dtu_num 情况下，dtu设置为0
              params.dtu_num = '0';
            }

            const rs = await dao.add_device(params);
            if (rs) {
              this.handleBack();
            }
          }
        });
      },

      handleTypeChange(val) {
        this.showHOST = false;
        this.showNUM = false;
        this.showDTU = false;
        console.info('val:', val);
        let validate = {};
        switch (val) {
        case '1':
          this.showHOST = true;
          this.showNUM = true;
          this.placeholder_name = detectorName;
          this.placeholder_addr = detectorAddr;
          validate = { validator: strMaxLength, max: 65536 };
          break;
        case '2':
          this.showDTU = true;
          this.placeholder_name = detectorName;
          this.placeholder_addr = detectorAddr;
          validate = { validator: strMaxLength, max: 65536 };
          break;
        case '3':case '4':
          this.showDTU = true;
          this.placeholder_name = deviceName;
          this.placeholder_addr = deviceAddr;
          validate = { validator: strMaxLength, max: 255 };
          break;
        case '5':
          this.showHOST = true;
          this.placeholder_name = '请输入烟感名称';
          this.placeholder_addr = deviceAddr;
          validate = { validator: strMaxLength, max: 99 };
          break;
        default:
          this.placeholder_name = '请输入烟感名称';
          this.placeholder_addr = deviceAddr;
          this.showHOST = false;
          this.showNUM = false;
          this.showDTU = false;
          validate = { validator: strMaxLength, max: 12 };
        }
        this.rules = Object.assign({}, this.rules, {
          property: [
            {required: true, message: '请输入设备地址'},
            validate
        ]});
      }
    },

    mounted() {
    },

    components: {
      pickerAddress
    }
  }
</script>

<style>

</style>
