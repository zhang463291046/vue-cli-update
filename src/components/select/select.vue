<template>
  <Select :value="value" v-bind="$attrs" v-on="$listeners" clearable>
    <Option v-for="(item, i) in arrList" :value="item.value" :key="i">
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
// 引用配置的selectConfig列表
import * as arrList from './selectConfig'
export default {
  props: {
    url: String,
    value: String
  },
  computed: {
    arrList () {
      return arrList[this.url]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
