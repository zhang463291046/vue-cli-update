<template>
  <div class="selector">
    <dt-search placeholder="请输入设备名称查找" v-model="params.content" @onSearch="handleSearch"/>
    <div class="selector-main">
      <dt-table  height="320" ref="table" @on-select-change="handleSelectChange" :columns="columns" url="user/get_menu_list" :params="params" methods="post"/>
    </div>
  </div>
</template>

<script>
  import { typeDict } from '../../configs';
  export default {
    name: 'deviceSelector',
    props: {
      userId: String
    },
    data() {
      return {
        selections: null,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {title: '设备类型', key: 'type', render: (h, params) => {
            const type = params.row.type;
            const dict = typeDict[type];
            return (
              <div>
              {dict}
              </div>
            )}
          },
          {title: '设备名称', key: 'name', width: '200px'}
        ],
        params: {
          content: '',
          person_id: this.userId
        }
      }
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
      handleSelectChange(selections) {
        this.selections = selections;
      },
      getSelection() {
        const str = [];
        const keys = [];
        if (this.selections) {
          Object.keys(this.selections).forEach((key) => {
            const object = this.selections[key];
            object.forEach((obj) => {
              str.push(obj.name);
              keys.push(obj.id);
            });
          });
        }
        return {
          value: keys.join(','),
          label: str.join(',')
        }
      }
    },

    watch: {
      userId(val) {
        this.params.person_id = val;
        this.handleSearch();
      }
    },

    mounted() {
    }
  }
</script>

<style>
  .selector-main{
    margin-top: 20px;
    height: 400px;
    overflow-y: auto;
  }
</style>
