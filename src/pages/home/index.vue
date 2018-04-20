<template>
  <div>
    <h1>{{$t("home.title")}}</h1>
    <dtButton>我是按钮</dtButton>
    <span @click="show=true">侧边栏</span>
    <dtSlidePage
      v-model = "show"
      title = "我是侧边栏"
      @on-ok = "handleOk">
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
      console.log(this)
    },

    methods: {
      handleOk(){
        console.log('---侧边栏点击保存---')
      }
    },
  };
</script>