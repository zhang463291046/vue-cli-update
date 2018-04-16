<template>
  <div class="home-bar">
    <div class="left">
      <slot name="img"></slot>
      {{currTitle}}
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dtTableTitle',
    props: {
      title: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        currTitle: this.title
      };
    },
    methods: {
      
    }
  };
</script>

<style lang="less" scoped>
  .home-bar{
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding: 0px 10px;
    .left{
      font-size: 15px;
      color: #2d8cf0;
      font-weight: bolder;
    }
    .right{
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    img{
      vertical-align: middle;
    }
    
  }
</style>
