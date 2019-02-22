<template>
  <div>
    <h1>地址选择组件</h1>
    <div @click="a">更改值</div>
    <div @click="b">更改值</div>
    <dt-selectAddress v-model="defaultValue"></dt-selectAddress>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        defaultValue: ['','','']
      }
    },

    mounted () {
      
    },
    watch: {
      defaultValue (val) {
        console.log(val)
      }
    },
    methods: {
      a() {
        this.defaultValue = ['广东省','深圳市','宝安区']
        // this.defaultValue = ["440000","440300","440306"]
      },
      b() {
        this.defaultValue = ['山西省','大同市','城区']
        // this.defaultValue = ["140000", "140200", "140211"]
      },
    },
  };
</script>