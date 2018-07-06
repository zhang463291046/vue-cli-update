<template>
  <div class="pickerAddr">
    <Row>
      <Col :span="24">
        <input v-model="curValue" type="text" ref="search" id="search" class="ivu-input" placeholder="请输入详细地址"/>
      </Col>
    </Row>
    <div class="picker-map" ref="ref"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'AMapAddress',

    props: {
      value: [String],
      latitude: [String, Number],
      longitude: [String, Number],
    },

    data() {
      return {
        address: '',
        curValue: this.value,
        positionResult: {}
      }
    },
    watch: {
    },
    mounted() {
      this.loadMap();
    },
    methods: {
      loadMap() {
        const self = this;
        const map = new AMap.Map(this.$refs.ref, {
          zoom: 16,
          resizeEnable: true
        });
        this.map = map;
        if (this.latitude && this.longitude) {
          const center = [Number(this.longitude), Number(this.latitude)];
          this.map.setZoomAndCenter(14, center);
        }

        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
          // 拖拽选址
          var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: self.map
          });
          // 拖拽地图成功回调
          positionPicker.on('success', function (positionResult) {
            console.log(positionResult)
            self.address = positionResult.address;
            self.positionResult = positionResult;
          });
          // 拖拽地图失败回调
          positionPicker.on('fail', function (positionResult) {
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
      getPositionResult() {
        return this.positionResult;
      },

    },
    
  }
</script>

<style lang="less" scoped>
  .pickerAddr{
    width: 100%;
    height: 200px;
  }
  .picker-map{
    width: 100%;
    height: 100%;
  }
</style>
