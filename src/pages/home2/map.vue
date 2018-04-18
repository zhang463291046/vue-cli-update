<template>
  <Row style="background: #fff;">
    <div>
      数据
    </div>
    <Col span="12" style="padding: 50px;">
      <div class="map">
        <div class="amap aMaker" ref="ref"></div>
      </div>
    </Col>
    <Col span="12" style="padding: 50px;">
      <dt-table :columns="columns" url="Mydevice/get_list" methods="post" :params="params" :pageable="false"></dt-table>
    </Col>
  </Row>
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
        this.addLabelData(val);
      },
      initMap() {
        this.map = new AMap.Map(this.$refs.ref, {
          zoom:5,
          resizeEnable: true
        });
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
    height: 500px;
  }
  .amap{
    width: 100%;
    height: 100%;
  }
</style>
