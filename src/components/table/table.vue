<template>
 <div class="table-wrap" ref="ref">
   <Table
     ref="table"
     :data="arrList"
     :columns="currColumns"
     no-data-text="暂时没有数据"
     :loading="loading"
     @on-selection-change="handleSelectChange"
   >
   </Table>

   <div class="table-page" v-show="pageable">
     <Page
       :total="page.currTotal"
       :pageSize="page.currPageSize"
       :current="page.currCurrent"
       show-total
       show-elevator
       @on-change="pageChange"
     ></Page>
   </div>
 </div>
</template>

<script>
  export default {
    name: 'dtTable',
    props: {
      url: String,
      params: {
        type: Object,
        default() {
          return {};
        }
      },
      columns: {
        type: Array,
        default () {
          return [];
        }
      },
      pageable: {
        type: Boolean,
        default: true
      },
    },

    data() {
      return {
        loading: false,
        currUrl: this.url,
        currParams: this.params,
        currColumns: this.columns,
        arrList: [],
        page: {
          currTotal: 0,
          currCurrent: 1,
          currPageSize: 10,
        },
        selection: {}
      };
    },
    watch: {
      params(val) {
        this.currParams = val;
        this.page.currCurrent = 1;
        this.getList();
      },
    },
    computed: {

    },
    mounted() {
      this.getList();
    },
    methods: {
      handleSelectChange(selection) {
        this.selection[this.currCurrent] = selection;
        this.$emit('on-select-change', this.selection);
      },
      selectionWrap(data) {
        const selection = this.selection[this.currCurrent];
        if (selection) {
          // 已经选中了某也
          const keys = selection.map((item) => item[this.primaryKey]);
          data.forEach((item) => {
            const key = item[this.primaryKey];
            if (keys.includes(key)) {
              item._checked = true;
            } else {
              item._checked = false;
            }
          });
        } else {
          // const newSelection = data.filter((item) => {
          //   if (item._checked) {
          //     return item;
          //   }
          // });
          const newSelection = data;
          this.handleSelectChange(newSelection);
        }
        return data;
      },
      pageChange(num) {
        this.page.currCurrent = num;
        this.getList();
      },
      getList() {
        this.loading = true;
        var param = Object.assign({}, this.currParams, {page: this.page.currCurrent});
        this.$http.post(this.currUrl, param).then(res=>{
          this.loading = false;
          this.arrList = res.data.list;
          this.page.currCurrent = Number(res.data.page);
          this.page.currTotal = Number(res.data.total);
        })
      },
    },
  };
</script>

<style lang="less" scoped>
  .table-wrap{
    .table-page{
      text-align: right;
      margin-top: 20px;
    }
  }
  // .ivu-table-wrapper{
  //   border: none;
  // }
</style>
