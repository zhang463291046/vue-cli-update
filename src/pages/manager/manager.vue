<template>
  <div class="single-main">
    <Tabs v-model='currName' class="mytab" type="card" @on-click="handleClick">
      <TabPane label="设备列表" icon="ios-list" name="devices">
        <devices v-if="currName=='devices'"></devices>
      </TabPane>
      <TabPane label="DTU列表" icon="ios-paper" name="dtu">
        <devices-dtu v-if="currName=='dtu'"></devices-dtu>
      </TabPane>
      <TabPane label="主机列表" icon="ios-photos" name="host">
        <devices-host v-if="currName=='host'"></devices-host>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import devices from './sub/devices.vue';
  import devicesDtu from './sub/devicesDtu.vue';
  import devicesHost from './sub/devicesHost.vue';
  import { getSessionStorage } from '../../common/utils';

  export default {
    name: '',
    data() {
      return {
        currName: 'devices'
      };
    },

    created() {
      const currName = getSessionStorage('currName') || 'devices';
      this.currName = currName;
    },

    methods: {
      handleClick(name) {
        this.currName = name;
      }
    },

    components: {
      devices, devicesDtu, devicesHost
    }
  };
</script>

<style>
</style>
