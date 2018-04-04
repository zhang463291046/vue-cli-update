<template>
  <div class="">
    <div class="pd-20">
      <div class="single-bar">
        <div class="left">
          <dt-search placeholder="请输入DTU名称查找" v-model="params.content" @onSearch="handleSearch"/>
        </div>
        <div class="right">
          <dt-button @click="handleAdd" v-if="isAdmin">添加DTU</dt-button>
        </div>
      </div>
      <dt-table :columns="columns" url="device/get_dtu_list" :params="params" methods="POST" ref="table">
      </dt-table>
    </div>
  </div>
</template>
<script>
  import auth from '../../../common/auth';
  import dao from '../dao';
  import { setSessionStorage } from '../../../common/utils';

  export default {
    data () {
      const userInfo = auth.getLocationUser();
      const type = userInfo.type;//  1超管，2 管理员 3用户，（用户只有查看的权限）
      const isAdmin = type === '1' || type === '2';
      const columns = [
        {title: 'DTU名称', key: 'dtu_name'},
        {title: 'DTUID', key: 'dtu_num'},
        {title: 'SIM卡', key: 'sim_id'},
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
              <i-poptip confirm transfer title="您确认删除该DTU吗？" on-on-ok={this.handleDel.bind(this, params.row)}>
          <dt-button shape="circle" icon={false} type="error" size="mini" ghost>删除</dt-button>
            </i-poptip>
            </div>
          );
          }
        }
      ];

      return {
        userType: type,
        isAdmin,
        columns,
        params: {
          content: ''
        }
      };
    },

    methods: {
      async handleDel(row) {
        const rs = await dao.del_dtu(row.id);
        if (rs) {
          this.$refs.table.refresh();
        }
      },
      handleAdd() {
        setSessionStorage('currName', 'dtu');
        this.$router.push({name: 'editDTU'});
      },
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    }
  };
</script>

