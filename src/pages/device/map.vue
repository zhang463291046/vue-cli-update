<template>
  <div class="map">
    <div class="map-search">
      <dt-search placeholder="请输入设备名称查找"  @onSearch="handleSearch"/>
    </div>
    <div class="map-info">
      <span class="map-info-item">DTU设备：{{dtuNum}}台</span>
      <span class="map-info-item">子设备：{{deviceNum}}台</span>
    </div>
    <div class="amap aMaker" ref="ref">

    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  import png from '../../assets/location.png';
  import pngOffline from '../../assets/location_offline.png';
  import pngWarning from '../../assets/location_warning.png';
  import dtSearch from '../../components/dtSearch';
  import cdao from '../commonDao';
  import { statusDict, statusClas } from '../configs';
  import { forEachValue, getValue } from '../../common/utils';

  export default {
    name: '',
    data () {
      return {
        dtuNum: '0',
        deviceNum: '0'
      };
    },

    methods: {
      handleSearch(val) {
        // this.$router.push({ name: 'subDevice', params: {id} });
        this.addLabelData(val);
      },
      initMap() {
        this.map = new AMap.Map(this.$refs.ref, {
          zoom: 14,
          resizeEnable: true
        });
        this.addLabelData();
      },
      getInfoTemplate(data) {
        // type=1 : 电气火灾探测器
        // type=2 : 独立式电气火灾探测器
        // type=3 : 电力监测仪表
        // type=4 : 温湿度传感器
        let { type, channel_info, is_alert, on_line } = data;
        let template = '';
        if (type === '4') {
          let txt = statusDict[on_line];
          let clas = statusClas[on_line];
          let temp = '0℃';
          let humidity = '0%';
          let info = {temp: '0℃', humidity: '0%'};
          if (is_alert === '1') {
            txt = '报警';
            clas = 'warning';
          }
          if (channel_info !== '') {
            try {
              info = JSON.parse(channel_info);
            } catch (e) {}
            if (/u00b0C$/.test(info.temp)) {
              info.temp = info.temp.replaceAll('u00b0C', '\u00b0C');
            }
            if (!/%$/.test(info.humidity)) {
              info.humidity = info.humidity + '%';
            }
            temp = info.temp;
            humidity = info.humidity;
          }
          template = '<div class="infoBody">' +
              '<div class="rows">' +
                '<div class="col"><div class="colorA">温度值：' + temp + '</div></div>' +
                '<div class="col"><div class="colorB">湿度值：' + humidity + '</div></div>' +
              '</div>' +
              '<div class="infoBody-pie mt-20">' +
                '<div class="pie ' + clas + '">' + txt + '</div>' +
              '</div>' +
            '</div>'
        } else if (type === '1' || type === '2') {
          let info = {};
          let html = [];
          // channel_info = '{"1":"0.0mA","2":"0.0u2103","3":"0.0u2103","4":"0.0u2103","5":"0.0u2103"}';
          if (channel_info !== '') {
            try {
              info = JSON.parse(channel_info);
            } catch (e) {}
          }
          forEachValue(info, (item, key, index) => {
            let val = item;
            let color = index % 2 === 0 ? 'colorA' : 'colorB';
            if (/u2103$/.test(val)) {
              val = val.replaceAll('u2103', '\u2103');
            }
            html.push(`<div class="rows ${color}">`+`通道${key}：`+val+'</div>');
          });

          if (html.length === 0) {
            // 表示没有数据
            html = [`<div class="no-data">暂无设备相关数据</div>`]
          }
          template = '<div class="infoBody">' +html.join('') +'</div>';
        } else if (type === '3') {
          let info = {};
//          channel_info = '{"UA":"232.0V","UB":"0.0V","UC":"0.0V","IA":"0.0A","IB":"0.0A","IC":"0.0A","PS":"0.00Kw","PFS":"1.000","FRE":"50Hz","EPP":"0.00Kwh","EQP":"0.00Kwh"}';
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
          template = '<div class="infoBody">' +
            '<div class="rows infoBody-header">' +
            '<div class="col"><div class="colorA">A相</div></div>' +
            '<div class="col"><div class="colorB">B相</div></div>' +
            '<div class="col"><div class="colorC">C相</div></div>' +
            '</div>' +
            '<div class="rows">' +
            `<div class="col colorA">${UA}</div>` +
            `<div class="col colorB">${UB}</div>` +
            `<div class="col colorC">${UC}</div>` +
            '</div>' +
            '<div class="rows">' +
            `<div class="col colorA">${IA}</div>` +
            `<div class="col colorB">${IB}</div>` +
            `<div class="col colorC">${IC}</div>` +
            '</div>' +
            `<div class="rows infoBody-item mt-20">总有功率值: ${PS} </div>` +
            `<div class="rows infoBody-item">总有功因素: ${PFS} </div>` +
            `<div class="rows infoBody-item">有功电能: ${EPP} </div>` +
            '</div>';
        }
        return template;
      },
      async addLabelData(content = '') {
        const data = await this.loadData(content);
        this.addMark(data);
      },
      addMark(data) {
        const self = this;
        if (self.markerList) {
          self.markerList.render([]);
        }
        if (data.length === 0) {
          return;
        }
        self.map.setCenter([Number(data[0].longitude), Number(data[0].latitude)]);
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
          function(MarkerList, SimpleMarker, SimpleInfoWindow) {
            const markerList = new MarkerList({
              map: self.map,
              getPosition: function(item) {
                return [item.longitude, item.latitude];
              },
              getMarker: function(item, context, recycledMarker) {
                const { is_alert, on_line } = item;
                let img = png;
                if (on_line === '0') {
                  img = pngOffline;
                }

                if (is_alert === '1') {
                  img = pngWarning;
                }
                return new SimpleMarker({
                  containerClassNames: 'aMaker',
                  title:item.address,
                  iconLabel: '',
                  iconStyle: {
                    src: img,
                    style: { width: '32px', height: '36px' }
                  },
                  map: self.map,
                  position: [Number(item.longitude), Number(item.latitude)],
                  extData: {id: item.id}
                });
              },
              getInfoWindow: function(dataItem) {
                console.info('------->getInfoWindow', dataItem.type);
                const template = self.getInfoTemplate(dataItem);
                if (!template) return;
                return new SimpleInfoWindow({
                  offset: new AMap.Pixel(0, -37),
                  infoTitle: '<div class="infoTitle event_click"><%- name %></div>',
                  infoBody: template,
                  infoTplData: dataItem
                });
              }
            });
            self.markerList = markerList;
            markerList.render(data);
            markerList.on('infoWindowClick', function(event, record) {
              if (event.target && event.target.classList.contains('event_click')) {
                const id = record.id;
                console.info('id:', id);
              }
            });
          }
        );
      },
      async loadData(content) {
        const data = await cdao.device_get_list(1, content);
        if (data) {
          this.deviceNum = data.device_num;
          this.dtuNum = data.dtu_num;
          return data.list;
        }
        return [];
      }
    },

    mounted () {
      setTimeout(() => {
        this.initMap();
      }, 500);
    },

    components: {
      dtSearch
    }
  };
</script>

<style lang="less">
  .map{
    width: 100%;
    height: 100%;
  }
  .map-info{
    position: absolute;
    right: 10px;
    top: 10px;
    background: #FFF;
    z-index: 1;
    font-size: 14px;
    border: 1px solid #d6d6d6;
    padding: 10px;
    .map-info-item{
      margin: 0 10px;
    }
  }
  .map-search{
    position: absolute;
    left: 10px;
    top: 10px;
    background: #FFF;
    z-index: 1;
    background: transparent;
  }
  .amap{
    width: 100%;
    height: 100%;
  }
  .aMaker{
    font-size: 14px;
    color: #7f8586;
    min-width: 150px;
    font-weight: bolder;

    .amap-simple-marker-label{
      top: 100%;
      left: -50%;
      text-align: center;
      display: inline-block;
    }

    .amap-simple-marker-icon-img{
      width: 32px;
      height: auto !important;
    }
  }

  .amap-ui-smp-ifwn-container {
    width: 280px;
    .amap-ui-smp-ifwn-content-body {
      padding: 14px;
      border: none;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
      border-radius: 2px;

      .infoTitle{
        color: #007ad0;
        cursor: pointer;
      }

      .infoBody{
        font-weight: 500;
        color: #007ad0;

        .no-data{
          color: #ec5710;
          padding: 10px 0px;
        }
        .infoBody-header{
          color: #007ad0;
        }

        .infoBody-item{
          padding: 5px 0px;
        }

        .infoBody-pie{
          .pie{
            width: 80px;
            height: 80px;
            margin: 20px auto 10px;
            border-radius: 50%;
            line-height: 80px;
            text-align: center;
            overflow: hidden;
            background-color: #74A7FF;
            color: #FFF;

            &.offline{
              background-color: #9B9B9B;
            }

            &.warning{
              background-color: #F57575;
            }
          }
        }
      }
    }
    .amap-ui-smp-ifwn-def-tr-close{
      margin: 12px;
    }

  }

</style>
