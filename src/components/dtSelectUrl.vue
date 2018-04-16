<template>
  <dt-select v-model="model" v-bind="$attrs" :options="currOptions" :labelField="labelField" :valueField="valueField"></dt-select>
</template>

<script>
  import HIO from '../common/HIO';
  import dtSelect from './dtSelect.vue';

  export default {
    name: 'dtSelectUrl',
    props: {
      url: String,
      methods: {
        type: String,
        default: 'post'
      },
      params: {
        type: Object,
        default: function () {
          return {}
        }
      },
      value: [String, Number, Array],
      labelField: {
        default: 'label1',
        type: String
      },
      valueField: {
        default: 'value1',
        type: String
      }
    },
    data() {
      return {
        currOptions: []
      }
    },

    methods: {
      async fetch() {
        const param = Object.assign({}, this.params);
        const rs = await HIO[this.methods](this.url, param);
        if (rs) {
          console.info('rs.data', rs.data);
          this.currOptions = rs.data;
        }
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

    watch: {
      params(val) {
        this.fetch();
      }
    },

    components: {
      dtSelect
    },

    mounted() {
      if (this.url) {
        this.fetch();
      }
    }
  }
</script>

<style>
</style>
