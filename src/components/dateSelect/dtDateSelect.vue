<template>
  <DatePicker 
    v-model="currValue" 
    type="date" 
    placeholder="请选择时间" 
    style="width: 120px">
  </DatePicker>
</template>

<script>
  export default {
    name: 'dtDateSelect',
    data() {
      return {
        currValue: ''
      };
    },
    watch: {
      currValue() {
        if(this.currValue==''){
          this.$emit('input', '');
        }else{
          this.$emit('input', this.currValue.Format('yyyy-MM-dd'));
        }
      }
    },
    methods: {
      
    },

    mounted() {
      
    }
  };
</script>

<style lang="less" scoped>
  
</style>
