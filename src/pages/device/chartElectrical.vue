<template>
  <div class="single-main sub-main">
    <div class="single-bar">
      <div class="left">
        <dt-back></dt-back>
      </div>
      <div class="single-bar-center">
        <div class="chart-address">{{address}}</div>
        <div class="chart-address"> {{name}}</div>
      </div>
    </div>

    <div class="chart-wrap">
      <div class="chart-tag">
        温度
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange1"></dtDateTimeSelect>
      </div>
      <div class="chart-main">
        <ECharts :options="options" :autoResize="true" class="echart-el"></ECharts>
      </div>
    </div>

    <div class="chart-wrap">
      <div class="chart-tag">
        漏电流
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange2"></dtDateTimeSelect>
      </div>
      <div class="chart-main">
        <ECharts :options="options2" :autoResize="true" class="echart-el"></ECharts>
      </div>
    </div>

  </div>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts';
  import dtBack from '../../components/dtBack';
  import dtDateTimeSelect from '../../components/dtDateTimeSelect';
  import dao from '../commonDao';

  require('echarts/lib/echarts');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');

  export default {
    name: 'chartElectrical',
    data () {
      return {
        address: '',
        name: '',
        id: '',
        options: {
          title: {
            text: '温度折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },

          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            name: '分钟',
            boundaryGap: false,
            data: []
          },

          yAxis: {
            type: 'value',
            name: '℃',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: '温度',
              type: 'line',
              smooth: true,
              smoothMonotone: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#74A7FF',
                    width: 3
                  },
                  borderColor: '#74A7FF'
                }
              },
              data: []
            }
          ]
        },
        options2: {
          title: {
            text: '漏电流折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },

          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            name: '分钟',
            boundaryGap: false,
            data: []
          },

          yAxis: {
            type: 'value',
            name: 'A',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: '漏电流',
              type: 'line',
              stack: '总量',
              smooth: true,
              smoothMonotone: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#FE9D9D',
                    width: 3
                  },
                  borderColor: '#FE9D9D'
                }
              },
              data: []
            },
            {
              name: '漏电流',
              type: 'line',
              stack: '总量',
              smooth: true,
              smoothMonotone: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#FE9D9D',
                    width: 3
                  },
                  borderColor: '#FE9D9D'
                }
              },
              data: []
            }
          ]
        }
      };
    },

    methods: {
      async loadData(type, date, hour) {
        const id = this.id;
        const data = await dao.device_get_report_data(id, type, date, hour);
        this.fillChart(type, data);
      },

      async fillChart(type, data) {
        const source = type === '1' ? this.options : this.options2;
        const clone = Object.assign({}, source);
        if (data) {
          clone.series[0].data = data.list;
          clone.xAxis.data = data.time;
        }
        console.info(data);
        if (type === '1') {
          this.options = clone;
        } else {
          this.options2 = clone;
        }
        console.info(this.options.series[0].data)
      },

      handleChange1(date, hour) {
        this.loadData('1', date, hour);
      },

      handleChange2(date, hour) {
        this.loadData('2', date, hour);
      }
    },

    mounted () {
      const params = this.$routeP.params || {};
      const { id, address, name } = params;
      this.id = id;
      this.address = address;
      this.name = name;
      let today = new Date();
      today = today.Format('yyyy-MM-dd');
      this.loadData('1', today, '01');
      this.loadData('2', today, '01');
    },

    components: {
      dtBack, ECharts, dtDateTimeSelect
    }
  };
</script>

<style lang="less">
  .chart-address{
    max-width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;

    &+.chart-address{
      margin-left: 20px;
    }
  }
</style>
