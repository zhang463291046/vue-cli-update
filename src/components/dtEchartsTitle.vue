<template>
  <div class="echarts-bar">
    <div class="left">
      <span class="title">{{currTitle}}</span>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dtEchartsTitle',
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
  .echarts-bar{
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding: 0px 10px;
    .left{
      
    }
    .right{
      
    }
    .title{
      width: 100px;
      height: 40px;
      font-size: 15px;
      border-radius: 40px;
      padding: 10px 25px;
      color: #2d8cf0;
      background: #e0efff;
    }
  }
  .blue{
    .title{
      color: #2d8cf0;
      background: #e0efff;
    }
  } 
  .red{
    .title{
      color: red;
      background: #fbdad2;
    }
  } 
</style>
