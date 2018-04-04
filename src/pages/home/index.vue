<template>
    <div class="panel-content">
      <Row>
        <Col span="12" style="padding:0px 15px 15px 0px;">
          <div class="home-bar">
             <div class="left">
               设备状态
             </div>
            <div class="right">
               查看更多 >>
            </div>
          </div>
          <dt-table :columns="columns" url="Mydevice/get_list" methods="post" :params="params" :pageable="false"></dt-table>
        </Col>
        <Col span="12" style="padding:0px 0px 15px 15px;">
          <div class="home-bar">
             <div class="left">
               用户反馈
             </div>
            <div class="right">
               查看更多 >>
            </div>
          </div>
          <dt-table :columns="columns" url="Mydevice/get_list" methods="post" :params="params" :pageable="false"></dt-table>
        </Col>
      </Row>
      <mapComponent/>
    </div>
</template>
<script>
  import { statusDict } from '../configs';
  import  mapComponent  from './map';
  export default {
    data () {
      return {
        columns: [
          { title: '设备名称', key: 'name' },
          { title: '设备地址', key: 'address' },
          { title: '责任人', key: 'person_str' },
          { title: '状态', key: 'on_line', }
        ],
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
          toolbox: {
            feature: {
              saveAsImage: {}
            },
            right: '4%',
          },
          xAxis: {
            type: 'category',
            name: '月',
            boundaryGap: false,
            data: []
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
              name: '警报次数',
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
      handleSearch() {
        this.params = Object.assign({}, this.params);
      }
    },

    components: {
      mapComponent
    }
  };
</script>
<style lang="less" scoped>
  .home-bar{
    height: 30px;
    line-height: 30px;
    background: #fff;
    padding: 0px 20px;
    color: #666;
    .left{
      text-align: left;
      font-size: 16px;
      color: #2d8cf0;
      font-weight: bolder;
    }
    .right{
      text-align: right;
    }
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
