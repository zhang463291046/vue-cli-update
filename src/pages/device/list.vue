<template>
    <div class="pd-20">
      <div class="single-bar">
         <div class="left">
           <dt-search placeholder="请输入设备名称查找" v-model.trim="params.content" @onSearch="handleSearch"/>
         </div>
        <div class="right">
        </div>
      </div>
      <dt-table
        :columns="columns"
        url="Mydevice/get_list"
        methods="post"
        :params="params"
      >

      </dt-table>
    </div>
</template>
<script>
  import { statusDict } from '../configs';

  export default {
    data () {
      return {
        columns: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center'
          // },
          { title: '设备名称', key: 'name' },
          { title: '设备地址', key: 'address' },
          { title: '责任人', key: 'person_str' },
          { title: '状态',
            key: 'on_line',
            render: (h, params) => {
              const label = statusDict[params.row.on_line];
              return (
                <div>
                  {label}
                </div>
              )
            }
          }
        ],
        params: {
          type: '2',
          content: ''
        }
      };
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    },

    components: {
    }
  };
</script>

