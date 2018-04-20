<template>
  <div>
    <h1>子页面1</h1>
    <dtButton>我是按钮</dtButton>
    <span @click="show=true">侧边栏</span>
    <dtSlidePage
      v-model = "show"
      title = "我是侧边栏">
      <h1>恭喜你看见我啦</h1>
    </dtSlidePage>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },

    mounted () {
      
    },

    methods: {
      
    },
  };
</script>