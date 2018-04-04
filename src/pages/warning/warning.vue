<template>
  <div class="single-main">
    <div class="pd-20">
      <div class="single-bar">
        <div class="left ">
          <dt-search style="width: 200px" placeholder="请输入设备名称或地址查找" v-model="params.content" @onSearch="handleSearch"/>
          <!-- <div style="width: 240px; display:inline-block;" class="bar-item"> -->
            <!-- 设备类型 -->
            <Select style="width: 177px" v-model="type" >
              <Option v-for="item in deviceTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          <!-- </div> -->
          <DatePicker :confirm="true" v-model="date" :options="options" format="yyyy/MM/dd" type="daterange"  placeholder="选择日期范围" style="width: 200px"></DatePicker>
        </div>
        <div class="right">
          <dt-button :icon="false" class="flbtn" @click="handleQuery">查询</dt-button>
          <dt-button :icon="false" type="warning" class="flbtn" @click="handleDownLoad" >导出</dt-button>
        </div>
      </div>
       <dt-table :columns="columns" url="alert/get_list" methods="POST" ref="table" :params="params">

      </dt-table>
    </div>
  </div>
</template>

<script>
  import dtTable from '../../components/dtTable';
  import dtSearch from '../../components/dtSearch';
  import dtButton from '../../components/dtButton';
  import { showTip } from '../../common/utils';
  import { disabledDate } from '../../common/form';
  import cdao from './dao';

  export default {
    name: '',
    data () {
      return {
        options: {
          disabledDate
        },
        type: '1',
        date: [],
        time: '',
        deviceTypes: [
          {label:'设备类',value:'1'},
          {label:'主机类',value:'2'}
        ],
        columns: [
          { title: '报警设备', key: 'device_name' },
          { title: '报警内容', key: 'content' },
          { title: '设备位置', key: 'address' },
          { title: '报警时间', key: 'alert_date' },
          { title: '解除报警时间', key: 'repair_time' },
          { title: '操作',
            key: 'active',
            width: '200px',
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
          content: '',
          stime:'',
          etime:'',
          type: '1'
        }
      };
    },
    methods: {
      handleQuery() {
        this.buildCondition();
      },
      handleSearch() {
        this.buildCondition();
      },
      async handleDel(row) {
        const rs = cdao.del_info({id:row.id});
        if (rs) {
          this.$refs.table.refresh();
        }
      },
      buildCondition() {
        this.params.type=this.type;
        if(this.date[0]!=''){
          this.params.stime = this.date[0].Format('yyyy-MM-dd');
          this.params.etime = this.date[1].Format('yyyy-MM-dd');
        }else{
          this.params.stime = '';
          this.params.etime = '';
        }
        this.params = Object.assign({}, this.params);
        // this.loadData(type, dateTypeStr, dateStr);
      },
      
      async handleDownLoad() {
        // const img = this.$refs.chart.getDataURL({ backgroundColor: '#fff' });
        // downloadFile('设备报警历史数据.png', img);
        const rs = cdao.export_list(this.params);
        rs.then(res => {
          // window.open(res.data);
          window.location.href = res.data;
        });
        // console.log(rs.'[[PromiseValue]]')
        // if (rs) {
        //   // this.$refs.table.refresh();
        //   // console.log(rs)
        //   //  window.location.href = rs['[[PromiseValue]]']['data']
        //   console.log(rs['[[PromiseValue]]'])
        //   window.open(rs['[[PromiseValue]]']['data']);
        // }
      }
    },
    mounted () {
    },
    components: {
      dtTable, dtSearch, dtButton
    }
  };
</script>

<style>

</style>
