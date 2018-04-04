<template>
    <div class="panel-content">
      <div class="single-bar">
        <div class="left">
          <dt-input-search v-model="params.content" placeholder="用户名/账号/手机号" @onSearch="handleSearch"/>
          <dt-select v-model="params.model1" :options="deviceTypeOption" width="150px"/>
          <dt-select v-model="params.model2" :options="deviceNumberOption" width="150px"/>
          <dt-select v-model="params.model3" :options="deviceNameOption" width="150px"/>
          <dt-date-select v-model="params.time1"/>
          至
          <dt-date-select v-model="params.time2"/>
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
          { title: '用户名', key: 'key1' },
          { title: '账号', key: 'key2' },
          { title: '手机号', key: 'key3' },
          { title: '设备型号', key: 'key4' },
          { title: '设备名称', key: 'key5' },
          { title: '用户定义设备名称', key: 'key6' },
          { title: '设备状态', key: 'key7' },
          { title: '回路', key: 'key8' },
          { title: '地址', key: 'key9' },
          { title: '通道', key: 'key10' },
          { title: '发现时间', key: 'key11' },
          { title: '注释信息', key: 'key12' },
          { title: '设备类型', key: 'key13' },
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

