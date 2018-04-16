<template>
  <div class="slide">
    <Menu accordion :active-name="activeName" width="auto" @on-select="changeMenu">
      <div v-for="(item,index) in menuList" :key="index">
        <MenuItem v-if="item.noChildren" :name="item.toName">
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
  import { pagesRouter } from '../router/index'
  export default {
    name: 'slideMenu',
    data() {
      return {
        activeName: 'home',
        menuList: pagesRouter,
      }
    },
    methods: {
      changeMenu(){

      }
    },
    watch: {
      
    },

    computed: {
      
    },
    mounted() {
     console.log(pagesRouter)
    }
  };
</script>

<style lang="less">
  .slide{
    position: fixed;
    width: 200px;
    top: 60px;
    left:0px;
    bottom: 0px;
    overflow: auto;
    background: #ffffff;
    transition: width .3s;
  }
</style>
