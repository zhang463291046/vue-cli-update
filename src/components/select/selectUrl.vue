<template>
  <Select :value="value" v-bind="$attrs" v-on="$listeners" clearable>
    <Option v-for="(item, i) in arrList" :value="item.value" :key="i">
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
export default {
  props: {
    url: String,
    value: String
  },
  data() {
    return {
      arrList: [],
    };
  },
  computed: {
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.post(this.url, {}).then(res=>{
        this.arrList = res.data;
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
