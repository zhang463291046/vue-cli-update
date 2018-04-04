<template>
    <div class="panel-content">
      <Row>
        <Col span="8">
          <p class="title">今天活用用户</p>
          <p class="number">20</p>
          <img src="../../assets/today.png" height="160px" width="100%">
        </Col>
        <Col span="8">
          <p class="title">7日活用用户</p>
          <p class="number">20</p>
          <img src="../../assets/seven.png" height="160px" width="100%">
        </Col>
        <Col span="8">
          <p class="title">30日活用用户</p>
          <p class="number">20</p>
          <img src="../../assets/thirty.png" height="160px" width="100%">
        </Col>
      </Row>
      <div class="count-chart">
        <!-- <div class="single-bar">
          <div class="left">
            <dt-search placeholder="请输入设备名称查找" v-model.trim="params.content" @onSearch="handleSearch"/>
          </div>
          <div class="right">
            <dt-search placeholder="请输入设备名称查找" v-model.trim="params.content" @onSearch="handleSearch"/>
          </div>
        </div> -->
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
          type: '2',
          content: ''
        },
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
      };
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    },

    components: {
    }
  };
</script>

<style lang="less" scoped>
  .title{
    color: #fff;
    position: absolute;
    top: 25px;
    left: 30px;
    font-size: 16px;
  }
  .number{
    color: #fff;
    position: absolute;
    top: 55px;
    left: 30px;
    font-size: 50px;
  }
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

