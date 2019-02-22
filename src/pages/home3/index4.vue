<template>
  <div>
    <h1>地址选择组件</h1>
    <div @click="a">更改值</div>
    <div @click="b">更改值</div>
    <Row :gutter="10">
      <Col span="8">
        <dt-selectArea type="province" v-model="province"></dt-selectArea>
      </Col>
      <Col span="8">
        <dt-selectArea type="city" :province="province" v-model="city"></dt-selectArea>
      </Col>
      <Col span="8">
        <dt-selectArea type="district" :province="province" :city="city" v-model="district"></dt-selectArea>
      </Col>
    </Row>  
  </div>
</template>
<script>
  export default {
    data () {
      return {
        province: '',
        city: '',
        district: '',
      }
    },

    mounted () {

    },
    watch: {
      province (val) {
        console.log(val)
      },
      city (val) {
        console.log(val)
      },
      district (val) {
        console.log(val)
      }
    },
    methods: {
      a() {
        this.province = '440000'
        this.city = '440300'
        this.district = '440306'
      },
      b() {
        this.province = '140000'
        this.city = '140200'
        this.district = '140211'
      },
    },
  };
</script>