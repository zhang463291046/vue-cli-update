<template>
  <div class="single-main">
    <Tabs v-model='currName' class="mytab" @on-click="handleClick">
      <TabPane label="地图展示" icon="android-map" name="map">
        <MapPage v-if="currName === 'map'"/>
      </TabPane>
      <TabPane label="列表展示" icon="social-windows" name="list">
         <ListPage v-if="currName === 'list'"/>
      </TabPane>
      <TabPane label="设备概览" icon="android-document" name="grid">
        <subDevice v-if="currName === 'grid'"/>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import MapPage from './map';
  import ListPage from './list';
  import subDevice from './subDevice';
  import { getSessionStorage, setSessionStorage } from '../../common/utils';

  export default {
    data () {
      return {
        currName: 'map'
      };
    },

    created() {
      const name = getSessionStorage('deviceTabName') || 'map';
      this.currName = name;
    },
    methods: {
      handleClick(name) {
        this.currName = name;
        setSessionStorage('deviceTabName', name);
      }
    },

    components: {
      MapPage,
      ListPage,
      subDevice
    }
  };
</script>
<style>
  .pd-20 {
    padding: 20px;
  }


</style>
