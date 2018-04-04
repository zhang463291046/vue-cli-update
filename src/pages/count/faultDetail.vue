<template>
  <div class="panel-content">
    <dt-table :columns="columns" url="" methods="post" :params="params" :pageable="false"></dt-table>
    <div class="count-chart">
      <div class="single-bar">
        <div class="left">
          故障次数
        </div>
        <div class="right">
          <dt-date-select v-model="params.time1"/>
          至
          <dt-date-select v-model="params.time2"/>
        </div>
      </div>
      <div class="count-chart-main">
        <ECharts :options="options" ref="chart" :autoResize="true" class="echart-el"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          type:'1',
          content: '',
          model1:'1',
          model2:'1',
          model3:'1',
          time1:'',
          time2:'',
        },
        columns: [
          { title: '设备名称', key: 'key1' },
          { title: '用户名', key: 'key2' },
          { title: '手机号', key: 'key3' },
          { title: '设备型号', key: 'key4' }
        ],
        options: {
          title: {
            text: '',
            left: '3%',
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#F57575'],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '日期',
            boundaryGap: false,
            data: ['2018-04-01','2018-04-02','2018-04-03','2018-04-04','2018-04-05','2018-04-06','2018-04-07']
          },
          yAxis: {
            type: 'value',
            name: '次数',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: '次数',
              type: 'line',
              smooth: true,
              smoothMonotone: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  }
                }
              },
              data: [10,35,20,40,6,35,20]
            }
          ]
        }
      }
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
    },

  };
</script>
<style lang="less" scoped>
  .count-chart{
    width: 100%;
    height: 500px;
    background: #fff;
    position: relative;
    .count-chart-main{
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      top: 30px;
    }
  }
</style>

