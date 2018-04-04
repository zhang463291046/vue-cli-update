<template>
  <div class="selector">
    <dt-search />
    <div class="selector-main">
      <dt-table ref="ref" height="320" :columns="columns" :url="url" :params="params"/>
    </div>
  </div>
</template>

<script>
  import dtSearch from '../../components/dtSearch';
  import dtTable from '../../components/dtTable';

  export default {
    name: '',
    data() {
      return {
        columns: [
          { type: 'selection', width: 100, align: 'center' },
          { title: '姓名', key: 'name' },
          { title: '电话', key: 'tel' }
        ],
        url: window.location.href.split('#'[0]) + '/test2',
        params: {}
      }
    },

    methods: {
      getSelectResult() {
        console.info(this.$refs.ref.getTable().getSelection())
      }
    },

    components: {
      dtSearch, dtTable
    }
  }
</script>

<style>
  .selector-main{
    margin-top: 20px;
    height: 400px;
    overflow-y: auto;
  }
</style>
