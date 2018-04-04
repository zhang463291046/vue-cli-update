<template>
  <div class="single-main">
    <div class="pd-20">
      <div class="single-bar">
        <div class="left">
          <dt-search placeholder="请输入公告标题" v-model="params.content" @onSearch="handleSearch"/>
        </div>
        <div class="right">
          <dt-button @click="handleAdd">添加</dt-button>
        </div>
      </div>
      <dt-table :columns="columns" url="notice/get_list" methods="POST" ref="table" :params="params">

      </dt-table>
    </div>
  </div>
</template>

<script>
  import cdao from '../commonDao';
  import auth from '../../common/auth'
  export default {
    name: '',
    data () {
      return {
        user: auth.getLocationUser(),
        columns: [
          { title: '标题', key: 'title' },
          { title: '发布人', key: 'uid', width: '110px' },
          { title: '公告内容', key: 'content' },
          { title: '发布时间', key: 'publish_time' },
          { title: '过期时间', key: 'expire_time' },
          { title: '是否过期',
            key: 'is_expire',
            width: '100px',
            render: (h, params) => {
              const expire = params.row.is_expire === '1' ? '已过期' : '未过期';
              return (
                <div>
                  {expire}
                </div>
              );
            }
          },
          { title: '操作',
            key: 'active',
            width: '300px',
            render: (h, params) => {
              return (
                <div>
                  <dt-button class="mr15" on-click={this.handleView.bind(this, params.row)} shape="circle" icon={false} size="mini" ghost>查看</dt-button>
                  <dt-button class="mr15" on-click={this.handleEdit.bind(this, params.row.id)} shape="circle" icon={false} size="mini" ghost>编辑</dt-button>
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
      handleValidate(){
        if(this.user.type != '1'){
          this.$Message.warning('很抱歉，您无操作权限');
          return ;
        }
      },
      handleAdd() {
        if(this.user.type != '1'){
          this.$Message.warning('很抱歉，您无操作权限');
          return ;
        }
        this.$router.$push({ 
          name: 'editNotice',
          params: { id:'' } 
        });
      },
      handleEdit(id) {
        if(this.user.type != '1'){
          this.$Message.warning('很抱歉，您无操作权限');
          return ;
        }
        this.$router.$push({ 
          name: 'editNotice',
          params: { id } 
        });
      },
      handleView(row) {
        if(this.user.type != '1'){
          this.$Message.warning('很抱歉，您无操作权限');
          return ;
        }
        const { id } = row;
        this.$router.$push({ name: 'showNotice', params: { id } });
      },
      async handleDel(row) {
        if(this.user.type != '1'){
          this.$Message.warning('很抱歉，您无操作权限');
          return ;
        }
        const id  = row.id;
        const rs = cdao.noticeDelInfo(id);
        if (rs) {
          this.$refs.table.refresh();
        }
      },
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    },

    mounted () {

    }
  };
</script>

<style>
</style>
