<template>
  <Button type="warning" @click="handleExport">导出</Button>
</template>

<script>
  export default {
    name: 'dtExportButton',
    props: {
      url: {
        type: String,
        default: ''
      },
      params: {
        type: Object,
        default() {
          return {};
        }
      },
    },
    data() {
      return {
        currUrl:this.url,
        currParams:this.params
      }
    },
    computed: {
      
    },
    methods: {
      handleExport() {
        console.log(this.currUrl,this.currParams)
        // const rs = cdao.export_list(this.params);
        // rs.then(res => {
        //   window.location.href = res.data;
        // });
      }
    },

    mounted() {
    }
  };
</script>

<style lang="less" scoped>
 
</style>
