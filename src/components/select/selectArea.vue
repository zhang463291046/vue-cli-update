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
      let rst = area
      this.disabled = false
      if (['city', 'district'].includes(this.type)) {
        if (this.province) {
          rst = rst.filter(v => v.value === this.province)[0].children
        } else {
          this.disabled = true
        }
      }
      if ('district' === this.type) {
        if (this.city) {
          rst = rst.filter(v => v.value === this.city)[0].children
        } else {
          this.disabled = true
        }
      }
      return rst
    }
  }
}
</script>
