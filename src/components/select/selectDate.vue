<template>
  <span>
    <DatePicker type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
    <DatePicker type="date" placeholder="请选择截止时间" style="width: 200px"></DatePicker>
  </span>
</template>

<script>
export default {
  props: {
    url: String,
    value: String
  },
  computed: {
    
  }
}
</script>

<style lang="less" scoped>

</style>
