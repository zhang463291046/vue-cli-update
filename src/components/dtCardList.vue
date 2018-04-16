<template>
 <div class="table-wrap" ref="ref">
    <Row>
      <Col span="6" class="col-padding">
        <div class="card">
          <div class="card-head">
             <h3>如何维修烟感设备</h3>
             <p>2017-11-11 11:11</p>
          </div>
          <div class="card-body">
            <img src="../assets/bg@3x.png" width="100%" height="150px">
          </div>
          <div class="card-foot">
            <Button type="warning" shape="circle" icon="edit"></Button>
            <Button type="error" shape="circle" icon="trash-a"></Button>
          </div>
        </div>
      </Col>      
      <Col span="6" class="col-padding">
        <div class="card">
          <div class="card-head">
             <h3>如何维修烟感设备</h3>
             <p>2017-11-11 11:11</p>
          </div>
          <div class="card-body">
            <img src="../assets/bg@3x.png" width="100%" height="150px">
          </div>
          <div class="card-foot">
            <Button type="warning" shape="circle" icon="edit"></Button>
            <Button type="error" shape="circle" icon="trash-a"></Button>
          </div>
        </div>
      </Col>  
    </Row>
   
    <div class="table-page" v-if="pageable">
     <Page
       :total="currTotal"
       :pageSize="currPageSize"
       :current="currCurrent"
       :pageSizeOpts="pageSizeOpts"
       :size="size"
       :simple="simple"
       :showTotal="showTotal"
       :showElevator="showElevator"
       :showSizer="showSizer"
       @on-change="pageChange"
       on-page-size-change="pageSizeChange"
     ></Page>
    </div>
  </div>
</template>

<script>
  import HIO from '../common/HIO';

  export default {
    name: 'dtCardList',
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      columns: {
        type: Array,
        default () {
          return [];
        }
      },

      params: {
        type: Object,
        default() {
          return {};
        }
      },

      primaryKey: {
        type: String,
        default: 'id'
      },

      pageable: {
        type: Boolean,
        default: true
      },

      methods: {
        type: String,
        default: 'GET'
      },

      total: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizeOpts: {
        type: Array,
        default() {
          return [10, 20, 30, 40];
        }
      },
      size: String,
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: true
      },
      showElevator: {
        type: Boolean,
        default: true
      },
      showSizer: {
        type: Boolean,
        default: false
      },

      onDataLoad: {
        type: Function,
        default() {
          return function() {};
        }
      },

      url: String
    },

    data() {
      return {
        currData: this.data,
        currColumns: this.columns,
        height: '500',

        currTotal: this.total,
        currCurrent: this.current,
        currPageSize: this.pageSize,
        currUrl: this.url,
        loading: false,
        currParams: this.params,
        noDataTxt: '没有数据!',
        selection: {}
      };
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
          const newSelection = data.filter((item) => {
            if (item._checked) {
              return item;
            }
          });
          this.handleSelectChange(newSelection);
        }
        return data;
      },
      setTableHeight() {
        const ref = this.$refs.ref;
        if (ref) {
          this.height = ref.parentNode.offsetHeight * 0.6;
        }
      },
      pageChange(num) {
        this.currCurrent = num;
        this.beginFetch();
      },

      pageSizeChange(pageSize) {
        this.currPageSize = pageSize;
        this.beginFetch();
      },

      beginFetch() {
        this.loading = true;
        let param = {};

        if (this.pageable) {
          param.page = this.currCurrent;
        }

        param = Object.assign({}, param, this.currParams);

        this.fetch(param);
      },

      async fetch(param) {
        let rs = null;
        if (this.methods.toLocaleLowerCase() === 'get') {
          rs = await HIO.get(this.currUrl, param);
        } else {
          rs = await HIO.post(this.currUrl, param);
        }

        this.onDataLoad(rs);

        this.loading = false;
        if (rs) {
          if (rs.errcode !== 0) {
            this.noDataTxt = '提示：' + rs.errmsg;
            this.currData = [];
          } else {
            this.currCurrent = Number(rs.data.page);
            this.currData = this.selectionWrap(rs.data.list);
            this.currTotal = Number(rs.data.total);
          }
        } else {
          this.noDataTxt = '提示：' + rs.errmsg;
          this.currData = [];
        }
      },

      getTable() {
        return this.$refs.table
      },
      refresh() {
        this.beginFetch();
      }
    },

    watch: {
      data(val) {
        this.currData = val;
      },
      columns(val) {
        this.currColumns = val;
      },
      params(val) {
        this.currParams = val;
        this.currCurrent = 1;
        this.beginFetch();
      },
      watch(url) {
        this.currUrl = url;
        this.beginFetch();
      }
    },
    computed: {
    },
    mounted() {
      this.$nextTick(() => {
        this.setTableHeight();
      });

      window.onresize = () => {
        this.setTableHeight();
      };

      if (this.currUrl) {
        this.beginFetch();
      }
    }
  };
</script>

<style lang="less" scoped>
  .col-padding{
    padding-right: 30px;
  }
  .card{
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
    border: 1px solid #dddee1;
    border-color: #e9eaec;
  }
  .card-head{
    padding: 15px;
    line-height: 1;
    p{
      padding-top: 10px;
      color: #666;
    }
  }
  .card-body{
    padding: 0px 15px;
  }
  .card-foot{
    line-height: 1;
    padding: 15px;
    text-align: right;
  }
  .table-wrap{
    .table-page{
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
