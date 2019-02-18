<template>
  <div class="page">
    <h1>地址选择器</h1>
    <dt-alSelector :defaultValue="arr"></dt-alSelector>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        arr: []
      }
    },

    mounted () {
      this.arr = ['广东省','深圳市','宝安区']
    },

    methods: {
    
    },
  };
</script>