<template>
  <div class="">
    <div class="pd-20">
      <div class="single-bar">
        <div class="left">
          <dt-search placeholder="主机名称查找" v-model="params.content" @onSearch="handleSearch"/>
        </div>
        <div class="right">
          <dt-button @click="handleAdd">添加主机</dt-button>
        </div>
      </div>
      <dt-table :columns="columns" url="device/get_master_list" :params="params" methods="POST" ref="table">
      </dt-table>
    </div>
  </div>
</template>
<script>
  import dao from '../dao';
  import { setSessionStorage } from '../../../common/utils';
  import { typeDict } from '../../configs';

  export default {
    data () {
      return {
        columns: [
          { title: '主机类型',
            key: 'type',
            render: (h, params) => {
              const type = params.row.type;
              const dict = typeDict[type];
              return (
                <div>
                  {dict}
                </div>
              );
            }
          },
          {title: '主机名称', key: 'name'},
          {title: '所属DTU', key: 'dtu_num'},
          {title: '主机地址', key: 'addr'},
          {title: '状态',
            key: 'on_line',
            render: (h, params) => {
              const on = params.on_line === '1';
              return (
                <div>
                {on ? '在线' : '离线'}
                </div>
            )
            }
          },
          {title: '操作',
            key: 'active',
            width: '180px',
            render: (h, params) => {
              return (
                <div>
                  <i-poptip confirm transfer title="您确认删除这条内容吗？" on-on-ok={this.handleDel.bind(this, params.row)}>
                    <dt-button shape="circle" icon={false} type="error" size="mini" ghost>删除</dt-button>
                  </i-poptip>
              </div>
            );
            }
          }
        ],
        params: {
          content: ''
        }
      };
    },

    methods: {
      async handleDel(row) {
        const rs = await dao.del_master(row.id);
        if (rs) {
          this.$refs.table.refresh();
        }
      },
      handleAdd() {
        setSessionStorage('currName', 'host');
        this.$router.push({name: 'editHost'});
      },
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    }
  };
</script>

