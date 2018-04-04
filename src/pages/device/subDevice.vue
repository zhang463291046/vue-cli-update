<template>
  <div class="sub-main over">
    <div class="single-bar">
      <div class="left">
        <dt-search placeholder="请输入设备名称查找" v-model="content" @onSearch="handleSearch"/>
      </div>
      <div class="right">
        <Page :total="pageInfo.total" :current="pageInfo.current" :pageSize="12" size="small"  @on-change="pageChange"></Page>
      </div>
    </div>
    <div class="over-main">
      <div class="cards w1120">
        <div class="card-body">
         <div class="card-item" v-for="item in list">
            <div class="card-item-top" @click="handleGo(item)">
              <div class="card-item-top-txt">
                {{item.name}}
                <Icon type="ios-arrow-forward" class="card-item-top-icon"></Icon>
              </div>
            </div>
            <div class="card-item-main">
              <div  v-if="item.type == '1' || item.type == '2'" class="card-item-status" :class="{'warning': item.is_alert=='1', 'offline' : item.on_line == '0'}">
                <Poptip placement="bottom" trigger="hover">
                  <span>{{item.txt}}</span>
                  <div class="card-detail" slot="content">
                    <div v-if="item.channel && item.channel.length > 0">
                      <div v-for="(obj, index) in item.channel" class="card-item-txt" :class="{'colorA': index%2==0, 'colorB': index%2==1}">
                        <span>{{obj.head}}: </span><span>{{obj.val}}</span>
                      </div>
                    </div>
                    <div v-else class="colorB">
                      暂无设备相关数据！
                    </div>
                  </div>
                </Poptip>
              </div>
              <div v-else-if="item.type == '4'">
                <div class="card-item-pd">
                  <span class="colorA">温度：{{item.temp}}</span>
                  <span class="colorB">湿度：{{item.humidity}}</span>
                </div>
                <div class="card-item-status" :class="{'warning': item.is_alert=='1', 'offline' : item.on_line == '0'}">
                  <span>{{item.txt}}</span>
                </div>
              </div>
              <div v-else-if="item.type == '3'">
                <div class="card-item-table">
                  <div class="card-item-table-title">
                    <div class="card-item-table-cell">
                      线路
                    </div>
                    <div class="card-item-table-cell">
                      电压
                    </div>
                    <div class="card-item-table-cell">
                      电流
                    </div>
                  </div>

                  <div class="card-item-table-cells">
                    <div class="card-item-table-cell">
                      A相
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.UA}}
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.IA}}
                    </div>
                  </div>

                  <div class="card-item-table-cells">
                    <div class="card-item-table-cell">
                      B相
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.UB}}
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.IB}}
                    </div>
                  </div>

                  <div class="card-item-table-cells">
                    <div class="card-item-table-cell">
                      C相
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.UC}}
                    </div>
                    <div class="card-item-table-cell">
                      {{item.channel.IC}}
                    </div>
                  </div>
                </div>

                <div class="card-item-sums">
                  <div class="card-item-sum">总有功率值： {{item.channel.PS}}</div>
                  <div class="card-item-sum">总有功率因素： {{item.channel.PFS}}</div>
                  <div class="card-item-sum">有功电能： {{item.channel.EPP}}</div>
                </div>
              </div>
              <div v-else>
                <div class="card-item-status" :class="{'warning': item.is_alert=='1', 'offline' : item.on_line == '0'}">
                  <span>{{item.txt}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dtSaveField from './dtSaveField.vue';
  import cdao from '../commonDao';
  import { statusDict, alertDict } from '../configs';
  import { forEachValue, getValue, setSessionStorage } from '../../common/utils';

  export default {
    data () {
      return {
        content: '',
        pageInfo: {
          current: 1,
          total: 0,
          pageSize: 10
        },
        list: [],

        list2: [
          {id: '1', name: '电气火灾探测器2号', temperature: '15', status: '0', electric: '15', more: 'q'},
          {id: '2', name: '电气火灾探测器2号', temperature: '15', status: '1', electric: '15', more: 'w'},
          {id: '3', name: '电气火灾探测器2号', temperature: '15', status: '2', electric: '15', more: 'e'},
          {id: '4', name: '电气火灾探测器2号', temperature: '15', status: '0', electric: '15', more: 'r'}
        ],

        list3: [
          {id: '1', name: '电力监测仪2号', A: { voltage: 220, electric: 12 }, B: { voltage: 220, electric: 12 }, C: { voltage: 220, electric: 12 }, status: '0', more: 'q'},
          {id: '2', name: '电力监测仪2号', A: { voltage: 220, electric: 12 }, B: { voltage: 220, electric: 12 }, C: { voltage: 220, electric: 12 }, status: '0', more: 'q'},
          {id: '3', name: '电力监测仪2号', A: { voltage: 220, electric: 12 }, B: { voltage: 220, electric: 12 }, C: { voltage: 220, electric: 12 }, status: '0', more: 'q'},
          {id: '4', name: '电力监测仪2号', A: { voltage: 220, electric: 12 }, B: { voltage: 220, electric: 12 }, C: { voltage: 220, electric: 12 }, status: '0', more: 'q'}
        ],

        list4: [
          {id: '1', name: '电气火灾探测器2号', temperature: '15', status: '0', humidity: '15', more: 'q'},
          {id: '2', name: '电气火灾探测器2号', temperature: '15', status: '1', humidity: '15', more: 'w'},
          {id: '3', name: '电气火灾探测器2号', temperature: '15', status: '2', humidity: '15', more: 'e'},
          {id: '4', name: '电气火灾探测器2号', temperature: '15', status: '0', humidity: '15', more: 'r'}
        ]
      };
    },

    methods: {
      handleGo (item) {
        const { type, id, name, address } = item;
        let routerName = '';
        if (['1', '2'].indexOf(type) !== -1) {
          routerName = 'chartElectrical';
        } else if (type === '3') {
          routerName = 'chartMonitor';
        }
        setSessionStorage('deviceTabName', 'grid');
        if (name) {
          this.$router.$push({ name: routerName, params: { id, name, address } });
        }
      },
      handleSearch() {
        this.pageInfo.current = 1;
        this.loadData();
      },
      async loadData() {
        const current = this.pageInfo.current;
        const content = this.content;
        const data = await cdao.device_get_list('3', content, current);
        if (data) {
          const { total, page, list } = data;
          this.pageInfo = { total, current: page };
          this.list = this.formate(list);
        } else {
          this.pageInfo = { total: 0, current: 1 };
        }
      },
      formate(list) {
        list.forEach((obj) => {
          const { type, channel_info, is_alert, on_line } = obj;
          let txt = statusDict[on_line] || statusDict['0'];
          let info = {};
          if (is_alert === '1') {
            txt = alertDict[is_alert];
          }
          obj.txt = txt;

          if (type === '4') {
            let temp, humidity;
            info = {temp: '0℃', humidity: '0%'};
            if (channel_info !== '') {
              try {
                info = JSON.parse(channel_info);
              } catch (e) {}
            }
            if (/u00b0C$/.test(info.temp)) {
              info.temp = info.temp.replaceAll('u00b0C', '\u00b0C');
            }
            if (!/%$/.test(info.humidity)) {
              info.humidity = info.humidity + '%';
            }
            temp = info.temp;
            humidity = info.humidity;
            obj.temp = temp;
            obj.humidity = humidity;
          } else if (type === '1' || type === '2') {
            if (channel_info !== '') {
              try {
                info = JSON.parse(channel_info);
              } catch (e) {}
            }
            const channel = [];
            //对象转换成数组
            // for (let [key, value] of Object.entries(info)) {
            //   if (/u2103$/.test(value)) {
            //     value = value.replaceAll('u2103', '\u2103');
            //   }
            //   channel.push({ head:`通道${key}`, val:value });
            // }
            forEachValue(info, (item, key, index) => {
              let val = item;
              if (/u2103$/.test(val)) {
                val = val.replaceAll('u2103', '\u2103');
              }
              const head = `通道${key}`;
              channel.push({ head, val });
            });
            obj.channel = channel;
          } else if (type === '3') {
            let info = {};
            if (channel_info !== '') {
              try {
                info = JSON.parse(channel_info);
              } catch (e) {}
            }
            const UA = getValue(info, 'UA', '0V');
            const UB = getValue(info, 'UB', '0V');
            const UC = getValue(info, 'UC', '0V');
            const IA = getValue(info, 'IA', '0A');
            const IB = getValue(info, 'IB', '0A');
            const IC = getValue(info, 'IC', '0A');
            const PS = getValue(info, 'PS', '0KW');
            const PFS = getValue(info, 'PFS', '0');
            const EPP = getValue(info, 'EPP', '0Kwh');
            obj.channel = { UA, UB, UC, IA, IB, IC, PS, PFS, EPP };
          }
        });
        return list;
      },
      pageChange(num) {
        this.pageInfo.current = num;
        this.loadData();
      }
    },

    components: {
      dtSaveField
    },

    mounted() {
      this.loadData();
    }
  };
</script>

<style lang="less">
  .w1120{
    width: 1120px;
    margin: 0px auto;
  }
  .over{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .over-main{
      flex: 1;
      overflow: auto;
    }
  }
.cards{
  font-size: 14px;
  margin: 0px auto;
  margin-top: -20px;
  .card-category{
    position: relative;
    color: #7A7E98;
    padding-left: 30px;

    &:before{
      content: '';
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 20px;
      width: 2px;
      background-color: #419BF9;
    }
  }

  .card-body{
  /*
    display: flex;
    flex-flow: row wrap;
    align-content: baseline;
    justify-content: flex-start;
    */
    &:after{
      content: "";
      clear: both;
      display: table;
      visibility: hidden;
      font-size: 0px;
      height: 0px;
    }

    .card-detail{
      color: #333;
    }

    .ivu-poptip-rel {
      span{
        border-bottom: 1px dotted #FFF;
        cursor: pointer;
      }
    }

    .card-item-pd{
      padding: 5px 15px;
      display: flex;
      justify-content: space-between;
    }
    .card-item{
      transition: all .5s ease 0s;
      width: 23.21%;
      height: 204px;
      border-radius: 4px;
      background-color: #F3F6FB;
      display: inline-block;
      float: left;

      margin-left: 20px;
      margin-top: 20px;

      .card-item-top{
        border-bottom: 1px dashed #d6d6d6;
        height: 38px;
        color: #6F6F6F;
        display: flex;
        align-items: center;

        .card-item-top-txt{
          width: 100%;
          padding-left: 15px;
          position: relative;
          cursor: pointer;

          .card-item-top-icon{
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
          }
        }
      }
      .card-item-main{
        position: relative;
      }
      .card-item-status{
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 100%;
        text-align: center;
        background-color: #74A7FF;
        position: absolute;
        top: 40px;
        left: 50%;
        margin-left: -40px;

        &.offline{
          background-color: #9B9B9B;
        }

        &.warning{
          background-color: #F57575;
        }
      }

      .card-item-field-short{
        width: 80%;
        margin: 0px auto;
      }

      .card-item-txt{
        line-height: 30px;
        padding-left: 15px;

        span{
          margin-right: 15px;
        }
      }

      .card-item-table{
        font-size: 12px;
        .card-item-table-title{
          background-color: #E3E9F3;
          font-size: 14px;
          color: #000000;
          width: 80%;
          margin: 5px auto;
          padding: 5px 0px;
          display: table;
          text-align: center;
        }

        .card-item-table-cells{
          display: table;
          width: 80%;
          margin: 0px auto;
          text-align: center;
          line-height: 20px;
        }

        .card-item-table-cell{
          display: table-cell;
          width: 33%;
        }
      }

      .card-item-sums{
        font-size: 12px;
        width: 80%;
        margin: 5px auto;
        &:after{
          content: "";
          clear: both;
          display: table;
          visibility: hidden;
          font-size: 0px;
          height: 0px;
        }

        .card-item-sum{
          text-align: left;
        }
      }
    }

  }

  &.cards-large .card-body{
    .card-item{
      width: 370px;
      height: 360px;
    }

    .card-item-field-short{
      width: 343px;
    }
  }
}

@media (min-width: 1500px) {
  .card-body{
  }
}
</style>
