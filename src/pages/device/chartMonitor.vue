<template>
  <div class="single-main sub-main">
    <div class="single-bar">
      <div class="left">
        <dt-back />
      </div>
      <div class="single-bar-center">
        <div class="chart-address">{{address}}</div>
        <div class="chart-address"> {{name}}</div>
      </div>
    </div>

    <div class="chart-wrap">
      <div class="chart-tag">
        电流值
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange1"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options1" :autoResize="true" class="echart-el"/>
      </div>
    </div>


    <div class="chart-wrap">
      <div class="chart-tag">
        电压值
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange2"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options2" :autoResize="true" class="echart-el"/>
      </div>
    </div>


    <div class="chart-wrap">
      <div class="chart-tag">
        总功率因素
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange3"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options3" :autoResize="true" class="echart-el"/>
      </div>
    </div>


    <div class="chart-wrap">
      <div class="chart-tag">
        总有功率
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange4"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options4" :autoResize="true" class="echart-el"/>
      </div>
    </div>


    <div class="chart-wrap">
      <div class="chart-tag">
        有功电能
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange5"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options5" :autoResize="true" class="echart-el"/>
      </div>
    </div>

    <div class="chart-wrap">
      <div class="chart-tag">
        无功电能
      </div>
      <div class="chart-time">
        <dtDateTimeSelect @on-change="handleChange6"/>
      </div>
      <div class="chart-main">
        <ECharts :options="options6" :autoResize="true" class="echart-el"/>
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
  require('echarts/lib/component/legend');

  const mapperKey = {
    '1': { A: 'ia', B: 'ib', C: 'ic' },
    '2': { A: 'ua', B: 'ub', C: 'uc' },
    '3': 'ps',
    '4': 'pfs',
    '5': 'epp',
    '6': 'eqp'
  }

  export default {
    name: '',
    data () {
      return {
        id: '',
        address: '',
        name: '',
        options1: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: ['A相', 'B相', 'C相']
          },
          color: ['#74A7FF', '#EFC569', '#FD9C9C'],
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
              name: 'A相',
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
              data: []
            },
            {
              name: 'B相',
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
              data: []
            },
            {
              name: 'C相',
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
              data: []
            }
          ]
        },
        options2: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: ['A相', 'B相', 'C相']
          },
          color: ['#74A7FF', '#EFC569', '#FD9C9C'],
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
            name: 'V',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: 'A相',
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
              data: []
            },
            {
              name: 'B相',
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
              data: []
            },
            {
              name: 'C相',
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
              data: []
            }
          ]
        },
        options3: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: []
          },
          color: ['#74A7FF'],
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
            name: 'KW',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: 'A相',
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
              data: []
            }
          ]
        },
        options4: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: []
          },
          color: ['#74A7FF'],
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
            name: 'KW',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: 'A相',
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
              data: []
            }
          ]
        },
        options5: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: []
          },
          color: ['#74A7FF'],
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
            name: 'KW·H',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: 'A相',
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
              data: []
            }
          ]
        },
        options6: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 40,
            data: []
          },
          color: ['#74A7FF'],
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
            name: 'KW·H',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#d6d6d6'
              }
            }
          },
          series: [
            {
              name: 'A相',
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
      fillChart(type, data = {}) {
        const source = this['options' + type];
        const clone = Object.assign({}, source);
        const time = data.time || [];
        const list = data.list || [];
        clone.xAxis.data = time;
        if (['1', '2'].indexOf(type) !== -1) {
          if (list.length > 0) {
            // 表示其它的数据为空
            clone.series[0].data = list;
            clone.series[1].data = list;
            clone.series[2].data = list;
          } else {
            const typeKey = mapperKey[type];
            clone.series[0].data = data[typeKey.A];
            clone.series[1].data = data[typeKey.B];
            clone.series[2].data = data[typeKey.C];
          }
        } else {
          const typeKey = mapperKey[type];
          if (list.length > 0) {
            clone.series[0].data = list;
          } else {
            clone.series[0].data = data[typeKey];
          }
        }

        this['options' + type] = clone;
      },
      handleChange1(date, hour) {
        this.loadData('1', date, hour);
      },
      handleChange2(date, hour) {
        this.loadData('2', date, hour);
      },
      handleChange3(date, hour) {
        this.loadData('3', date, hour);
      },
      handleChange4(date, hour) {
        this.loadData('4', date, hour);
      },
      handleChange5(date, hour) {
        this.loadData('5', date, hour);
      },
      handleChange6(date, hour) {
        this.loadData('6', date, hour);
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
      this.loadData('3', today, '01');
      this.loadData('4', today, '01');
      this.loadData('5', today, '01');
      this.loadData('6', today, '01');
    },

    components: {
      dtBack, ECharts, dtDateTimeSelect
    }
  };
</script>

<style lang="less" scoped>

</style>
