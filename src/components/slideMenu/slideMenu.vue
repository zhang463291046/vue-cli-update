<template>
  <div class="slide">
    <div style="height:60px; background: #2d8cf0;text-align: center;">
      <img width="200px" height="60px" src="@/assets/logo.png">
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
      // var pagesRouter = JSON.parse(localStorage.getItem("menuInfo"))
      return {
        activeName: 'home',
        menuList: pagesRouter,
      }
    },
    methods: {
      changeMenu(name){
        localStorage.setItem("menuName",name)
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
