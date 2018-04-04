<template>
  <div>
    <dt-table :columns="columns" url="user/get_list" :params="params" methods="POST" ref="table"/>
  </div>
</template>

<script>
  import { sexDict, levelDict } from '../../configs';
  import cdao from '../dao';

  export default {
    name: '',
    props: {
      content: {
        type: String,
        default: ''
      },
      currName: {
        type: String,
        default: '3'
      }
    },
    data() {
      return {
        columns: [ { title: '责任人', key: 'real_name' },
          { title: '年龄', key: 'age' },
          { title: '性别',
            key: 'sex',
            render: (h, params) => {
              const sex = params.row.sex;
              const chinese = sexDict[sex];
              return (
                <div>
                {chinese}
                </div>
            );
            }
          },
          { title: '联系电话', key: 'mobile' },
          { title: '邮箱', key: 'email' },
          { title: '责任人级别', 
            key: 'level',
            render: (h, params) => {
              const level = params.row.level;
              const levelText = levelDict[level];
              return (
                <div>{levelText}</div>
              );
            } 
          },
          { title: '责任设备', key: 'devices' },
          { title: '操作',
            key: 'active',
            render: (h, params) => {
              return (
                <div>
                  <dt-button class="mr15" on-click={this.handleAdd.bind(this, params.row.uid)} shape="circle" icon={false} size="mini" ghost>编辑</dt-button>
                  <i-poptip confirm transfer title="您确认删除这条内容吗？" on-on-ok={this.handleDel.bind(this, params.row)}>
                    <dt-button shape="circle" icon={false} type="error" size="mini" ghost>删除</dt-button>
                  </i-poptip>
                </div>
            );
            }
          }],
        params: {
          type: '3',
          content: this.content
        }
      }
    },

    methods: {
      handleAdd(id) {
        const currName = this.currName;
        this.$router.$push({ name: 'editUsers', params: { id, currName } });
      },
      handleDel(row) {
        console.log(row);
        const rs = cdao.del_user({id: row.uid,user_type: 3});
        if (rs) {
          this.$refs.table.refresh();
        }
      }
    },

    watch: {
      content(val) {
        this.params.content = val;
        this.params = Object.assign({}, this.params);
      }
    },

    mounted() {
    }
  }
</script>

<style>
</style>
