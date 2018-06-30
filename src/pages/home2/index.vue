<template>
  <div>
    <h1>mockjs模拟数据</h1>
    <dt-table url="device/get_list" :params="params" :columns="columns"></dt-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {
          username: '',
          parts_state_str: '',
          gateway_type: '1',
          device_type: '',
          name: '',
          start_time: '',
          end_time: ''
        },
        columns: [
          { title: '用户名', key: 'key1' },
          { title: '设备状态', key: 'key2' },
          { title: '设备类型', key: 'key3' },
          { title: '设备型号', key: 'key4' },
          { title: '设备名称', key: 'key5' },
          { title: '用户定义设备名称', key: 'key6' },
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