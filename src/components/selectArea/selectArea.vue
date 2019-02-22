<template>
  <Select :value="value" v-bind="$attrs" v-on="$listeners" :disabled="disabled" clearable>
    <Option
      v-for="(item, i) in opts"
      :value="item.value"
      :key="i"
    >{{ item.label }}</Option>
  </Select>
</template>

<script>
import area from './area'
export default {
  name:'selectArea',
  props: {
    name: String,
    value: String,
    type: {
      type: String,
      validator: v => ['province', 'city', 'district'].includes(v),
      default: 'province'
    },
    province: String,
    city: String
  },
  data: () => ({
    disabled: true
  }),
  computed: {
    opts () {
      // 为省数据
      let rst = area
      this.disabled = false
      // 如果为市或者区时查找children
      if (['city', 'district'].includes(this.type)) {
        if (this.province) {
          const list = rst.filter(v => v.value === this.province)
          if(list.length){
            rst = list[0].children
          }else{
            rst = []
          }
        } else {
          this.disabled = true
        }
      }
      // 如果为区时查找children
      if ('district' === this.type) {
        if (this.city) {
          const list = rst.filter(v => v.value === this.city)
          if(list.length){
            rst = list[0].children
          }else{
            rst = []
          }
        } else {
          this.disabled = true
        }
      }
      return rst
    }
  }
}
</script>
