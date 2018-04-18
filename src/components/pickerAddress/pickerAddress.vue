<template>
  <div class="pickerAddr">
    <div class="picker-tool">
      <Row>
        <Col :span="4">
        当前地址：
        </Col>
        <Col :span="18">
        {{address}}
        </Col>
      </Row>
      <Row style="margin-top: 10px" v-show="search">
        <Col :span="4">
        地址搜索：
        </Col>
        <Col :span="12">
        <input type="text" ref="search" id="search" class="ivu-input"/>
        </Col>
      </Row>
    </div>
    <div class="picker-map" ref="ref"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'pickerAddress',

    props: {
      latitude: [String, Number],
      longitude: [String, Number],
      search: Boolean
    },

    data() {
      return {
        address: '',
        positionResult: {}
      }
    },
    methods: {
      getPositionResult() {
        return this.positionResult;
      },

    },
    mounted() {
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

        const positionPicker = new PositionPicker({
          mode: 'dragMap',
          map: self.map
        });

        positionPicker.on('success', function (positionResult) {
          self.address = positionResult.address;
          self.positionResult = positionResult;
        });
        positionPicker.on('fail', function (positionResult) {
          self.address = '定位解析失败，请稍后重试！';
        });

        positionPicker.start();
      });


      var auto = new AMap.Autocomplete({
        input: 'search'
      });
      AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
      function select(e) {
        console.info('eeeee:', e);
        if (e.poi && e.poi.location) {
          map.setZoom(15);
          map.setCenter(e.poi.location);
        }
      }

    },
    watch: {
    }
  }
</script>

<style scoped>
  .pickerAddr{
    width: 600px;
    height: 500px;
    font-size: 14px;
  }
  .picker-tool{
  }
  .picker-map{
    width: 100%;
    height: 90%;
  }
</style>
