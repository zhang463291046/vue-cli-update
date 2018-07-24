<template>
  <div class="slide">
    <div>
      <img width="100%" height="60px" src="@/assets/logo.png" style="background: #2d8cf0;">
    </div>
    <Menu accordion :active-name="activeName" width="auto" @on-select="changeMenu">
      <div v-for="(item,index) in menuList" :key="index">
        <MenuItem v-if="!item.hasChildren" :name="item.toName">
          <Icon :type="item.icon"></Icon>
          {{ item.title }}
        </MenuItem>
        <Submenu v-else :name="item.toName">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            {{ item.title }}
          </template>
          <MenuItem v-for="(item2,index2) in item.children" :key="index2" :name="item2.name">{{ item2.title }}</MenuItem>
        </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>
  import { pagesRouter } from '@/router/index'
  export default {
    name: 'slideMenu',
    data() {
      return {
        activeName: 'home',
        menuList: pagesRouter,
      }
    },
    methods: {
      changeMenu(name){
        this.$router.push({name});
      }
    },
    watch: {
      
    },

    computed: {
      
    },
    mounted() {

    }
  };
</script>

<style lang="less" scoped>
  .slide{
    position: fixed;
    width: 200px;
    top: 0px;
    left:0px;
    bottom: 0px;
    z-index: 2;
    overflow: auto;
    background: #ffffff;
  }
</style>
