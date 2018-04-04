<template>
    <div class="panel-content">
      <div class="single-bar">
        <div class="left">
          <Button type="primary" icon="plus">添加</Button>
        </div>
        <div class="right">
          
        </div>
      </div>
      <dt-table :columns="columns" url="Mydevice/get_list" methods="post" :params="params"></dt-table>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          type:'1',
          content: '',
          model1:'1',
          model2:'1',
          model3:'1',
          time1:'',
          time2:'',
        },
        columns: [
          { title: '固件名称', key: 'key1' },
          { title: '版本号', key: 'key2' },
          { title: '更新说明', key: 'key3' },
          { title: '更新时间', key: 'key4' },
          { title: '操作', key: 'key5' },
        ],
      }
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
    },

  };
</script>

