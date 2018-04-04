<template>
    <div class="panel-content">
      <div class="single-bar">
        <div class="left">
          <dt-input-search v-model="params.content" placeholder="用户名/手机号" @onSearch="handleSearch"/>
          <dt-select v-model="params.model1" :options="feedbackStatusOption" width="150px"/>
        </div>
        <div class="right">
          <dt-export-button url="Mydevice/get_list" :params="params"/>
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
          { type: 'selection',width: 60,align: 'center'},
          { title: '用户名', key: 'key1' },
          { title: '手机号', key: 'key3' },
          { title: '反馈问题', key: 'key4' },
          { title: '反馈时间', key: 'key5' },
          { title: '反馈状态', key: 'key6' },
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

