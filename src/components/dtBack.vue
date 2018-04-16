<template>
  <div class="dt-back" @click="handleClick">
    <Icon type="ios-arrow-back" class="dt-back-icon"/>
    <span>返回</span>
  </div>
</template>

<script>
  export default {
    name: 'dtBack',
    methods: {
      handleClick () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less">
  .dt-back{
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    padding-left: 5px;
    user-select: none;

    &:active{
      color: #80AFFF
    }
  }

  .dt-back-icon{
    vertical-align: middle;
  }
</style>
