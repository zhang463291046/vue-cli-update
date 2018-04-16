<template>
  <Select v-model="model" v-bind="$attrs" :style="{width:currWidth}">
    <Option
      v-for="(item, index) in currOptions"
      :value="item[valueField]"
      :key="index"
    >{{ item[labelField] }}</Option>
  </Select>
</template>

<script>
  export default {
    name: 'dtSelect',
    props: {
      options: {
        type: Array,
        default: []
      },
      width: {
        default: '100%',
        type: String
      },
      value: [String, Number, Array],
      labelField: {
        default: 'label',
        type: String
      },
      valueField: {
        default: 'value',
        type: String
      }
    },
    data() {
      return {
        currOptions: this.options,
        currWidth: this.width,
      }
    },
    computed: {
      model: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val);
          this.$emit('on-change', val);
        }
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="less" scoped>
  
</style>
