<template>
  <div>
    <h1>mockjs模拟数据</h1>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        条件1：<Input v-model="params.key1" class="dt-search-input" placeholder="请输入条件1" />
      </div>
      <div class="dt-search-cell">
        条件2：<dt-select v-model="params.key2" class="dt-search-select" url="deviceType"/>
      </div>
      <div class="dt-search-cell">
        条件3：<dt-selectUrl v-model="params.key3" class="dt-search-select" url="device/get_select"/>
      </div>
      <div class="dt-search-cell">
        <Button type="ghost" @click="handleSearch">查询</Button>
      </div>
    </div>
    <dt-table url="device/get_list" :params="params" :columns="columns"></dt-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {
          key1: '',
          key2: '',
          key3: ''
        },
        columns: [
          { title: '标题1', key: 'key1' },
          { title: '标题2', key: 'key2' },
          { title: '标题3', key: 'key3' },
          { title: '标题4', key: 'key4' },
          { title: '标题5', key: 'key5' },
          { title: '标题6', key: 'key6' },
          { title: '操作', 
            key: 'operation' ,
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small',
                          shape: 'circle',
                          icon: 'trash-a'
                      },
                      on: {
                          click: () => {
                            console.log('点击事件')
                            this.handleRemove('device/get_list',params.row.key1)
                          }
                      }
                  }, '删除')
              ]);
            }
          }
        ],
      }
    },
    mounted () {
    },
    methods: {
      
    },
  };
</script>