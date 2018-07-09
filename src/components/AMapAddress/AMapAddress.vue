<template>
  <div class="pickerContent">
    <Row>
      <Col :span="24">
        <input v-model="value" type="text" ref="search" id="search" class="ivu-input" placeholder="请输入详细地址"/>
      </Col>
    </Row>
    <div class="pickerMap" ref="map"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'AMapAddress',

    props: {
    },

    data() {
      return {
        value: '', // 输入地址
        longitude: '', // 经度
        latitude: '', // 维度
        address: '', // 详细地址
      }
    },
    watch: {
    },
    mounted() {
      this.loadMap();
    },
    methods: {
      // 加载地图
      loadMap() {
        const map = new AMap.Map(this.$refs.map, {
          zoom: 16,
          resizeEnable: true
        });
        this.map = map;
        const self = this;
        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
          // 拖拽选址
          var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map
          });
          // 拖拽地图成功回调
          positionPicker.on('success', function (positionResult) {
            self.longitude = positionResult.position.lng;
            self.latitude = positionResult.position.lat;
            self.address = positionResult.address;
          });
          // 拖拽地图失败回调
          positionPicker.on('fail', function (positionResult) {
            self.longitude = 0;
            self.latitude = 0;
            self.address = '定位解析失败，请稍后重试！';
          });
          // 开启拖拽选址
          positionPicker.start();
        });

        // 输入地址
        var auto = new AMap.Autocomplete({
          input: 'search'
        });
        //注册监听，当选中某条记录时会触发
        AMap.event.addListener(auto, "select", function(e) {
          if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
          }
        });
      },
      // 获取点信息
      getPosition() {
        return {
          value: this.value,
          longitude: this.longitude,
          latitude: this.latitude,
          address: this.address,
        }
      },
      // 设置点信息
      setPosition(params={}) {
        this.value = params.value;
        this.longitude = params.longitude;
        this.latitude = params.latitude;
        this.address = params.address;
        var center = [Number(params.longitude), Number(params.latitude)];
        this.map.setZoomAndCenter(14, center);
      },
    },
  }
</script>

<style lang="less" scoped>
  .pickerContent{
    width: 100%;
  }
  .pickerMap{
    width: 100%;
    height: 200px;
    margin-top: 10px;
  }
</style>
