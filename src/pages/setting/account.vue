<template>
  <div class="single-main">
    <div class="single-bar">
      <div class="left">
        <dt-back />
      </div>
    </div>
    <div class="edit-wrap">
      <Form :model="form" :rules="rules" ref="ref" label-position="left" :label-width="100">
        <FormItem prop="photo" label="头像">
            <Upload
              :before-upload="handleUpload"
              action=""
            >
              <img :src="imgSrc" class="logo" />
            </Upload>
          </FormItem>
        <FormItem prop="real_name" label="姓名">
            <Input type="text" v-model="form.real_name" class="input-gray" placeholder="请输入姓名"/>
          </FormItem>
        <FormItem prop="real_name" label="姓名">
            <Input type="text" v-model="form.real_name" class="input-gray" placeholder="请输入姓名"/>
          </FormItem>
        <FormItem prop="sex" label="性别">
            <RadioGroup  v-model="form.sex">
              <Radio label="1" >男</Radio>
              <Radio label="2" >女</Radio>
            </RadioGroup >
          </FormItem>
        <FormItem prop="birthday" label="生日">
            <DatePicker v-model="form.birthday"  format="yyyy-MM-dd" type="date"  placeholder="请选择过期时间" style="width: 100%"></DatePicker>
          </FormItem>
        <FormItem prop="mobile" label="联系方式">
            <Input type="text" v-model="form.mobile" class="input-gray" placeholder="请输入联系方式"/>
          </FormItem>
        <FormItem prop="email" label="邮箱">
            <Input type="email" v-model="form.email" class="input-gray" placeholder="请输入邮箱"/>
          </FormItem>
        <FormItem prop="address" label="地址">
            <Input type="email" readonly="readonly" @click.native="pickerVisiable = true" v-model="form.address" class="input-gray" placeholder="请输入地址"/>
          </FormItem>
        <div class="edit-bottom">
          <span><dt-button class="largeBtn" :icon="false" @click="handleOk">保存</dt-button></span>
        </div>
      </Form>
      <div v-if="pickerVisiable">
        <Modal
          v-model="pickerVisiable"
          title="地址选择器"
          width="632px"
          @on-ok="handlePickerOk"
        >
          <pickerAddress ref="pickerAddress" :latitude="form.latitude"  :longitude="form.longitude"/>
        </Modal>
      </div>

    </div>
  </div>
</template>

<script>
  import dtButton from '../../components/dtButton';
  import pickerAddress from '../../components/pickerAddress.vue';
  import { getValue } from '../../common/utils';
  import uploadImg from '../../assets/but_upload.png';
  import dtBack from '../../components/dtBack';
  import cdao from '../commonDao';

  /* eslint-disable prefer-promise-reject-errors */
  export default {
    name: '',
    data() {
      return {
        pickerVisiable: false,  // 地址选择
        imgSrc: uploadImg,
        form: {
          photo: '',
          sex: '1',
          real_name: '',
          birthday: '',
          mobile: '',
          email: '',
          address: ''
        },
        rules: {
          photo: [
            { required: true, message: '请选择头像' }
          ],
          real_name: [
            { required: true, message: '姓名不能为空'}
          ],
          sex: [
            { required: true, message: '性别不能为空'}
          ],
          birthday: [
            { required: true, type: 'date', message: '生日不能为空'}
          ],
          mobile: [
            { required: true, message: '电话不能为空'}
          ],
          email: [
            { required: true, message: '邮箱不能为空'}
          ],
          address: [
            { required: true, message: '地址不能为空'}
          ],
          password: [
            { required: true, message: '密码不能为空'}
          ]
        }
      };
    },

    methods: {
      handleOk() {
        // 表单提交
        this.$refs.ref.validate(async (ok) => {
          if (ok) {
            const params = Object.assign({}, this.form);
            params.birthday = params.birthday.Format('yyyy-MM-dd');
            const rs = await cdao.modify_info(params);
            if (rs) {
              // this.$store.dispatch('setUserRealName', params.real_name);
              // this.$router.go(-1);
              cdao.login_out();
            }
          }
        });
      },

      handlePickerOk() {
        // 地址选择
        const data = this.$refs.pickerAddress.getPositionResult();
        this.form.address = data.address;
//        this.form.latitude = getValue(data.position, 'lat');
//        this.form.longitude = getValue(data.position, 'lng');
      },

      handleUpload(file) {
        return new Promise(async (resolve, reject) => {
          // 如果是表单和图片一起上传，则用此方法；否则用自带的上传
          const suffix = ['jpg', 'jpeg', 'png'];
          const arr = file.name.split('.');
          const fileType = arr[arr.length - 1];

          if (suffix.indexOf(fileType) < 0) {
            this.$Notice.warning({
              title: '警告',
              desc: '格式不正确, 请上传.jpg或.png格式的图片'
            });
            reject();
            return false;
          }
          if (file.size > 1024 * 1000) {
            // 大于1024kb
            this.$Notice.warning({
              title: '警告',
              desc: '文件大小不得超过1MB'
            });
            reject();
            return false;
          }

          const params = { image: file };
          const data = await cdao.uploadImg(params);
          if (data) {
            this.imgSrc = `${data.host}${data.path}`;
            this.form.photo = `${data.path}`;
          } else {
            this.imgSrc = uploadImg;
            this.form.photo = '';
          }
          reject();
        });
      },

      async loadInfo() {
        const data = await cdao.get_info();
        if (data) {
          let { real_name, address, host, birthday, email, mobile, photo, sex } = data;
          if (birthday) {
            try {
              birthday = new Date(birthday)
            } catch (e) {}
            this.form.birthday = birthday;
          }
          this.form.real_name = real_name;
          this.form.address = address;
          this.form.email = email;
          this.form.mobile = mobile;
          this.form.photo = photo;
          this.form.sex = sex;
          this.imgSrc = `${host}${photo}`;
        }
      }
    },

    watch: {
      'form.birthday'(val) {
        console.info(val, typeof val)
      }
    },

    components: {
      dtButton, pickerAddress, dtBack
    },

    mounted() {
      this.loadInfo();
    }
  };
</script>

<style lang="less">
  .rightBtn{
    width: 18%;
    height: 34px;
    text-align: center;
    line-height: 35px;
    position: absolute;
    bottom: 1px;
    right: 0px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #F57575;
    color: #F57575;

    &:active{
        color: #FFF;
        background-color: #F57575;
     }
  }

  .error{
    color: #ed3f14;
  }
</style>
