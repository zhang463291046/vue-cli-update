<template>
  <div class="page">
    <h1>中英版:{{$t("home.title")}}</h1>
    <Timeline>
      <TimelineItem color="green">
        <Icon type="trophy" slot="dot"></Icon>
        <span>框架集成技术,绿色:已完成,蓝色:研发中,红色:未来规划</span>
      </TimelineItem>
      <TimelineItem color="green">网络请求axios</TimelineItem>
      <TimelineItem color="green">模拟数据mock</TimelineItem>
      <TimelineItem color="green">websocket通讯mqtt</TimelineItem>
      <TimelineItem color="green">基础UI框架iview</TimelineItem>
      <TimelineItem color="green">报表图形统计vue-echarts</TimelineItem>
      <TimelineItem color="green">样式支持less,sass,scss</TimelineItem>
      <TimelineItem color="green">路由配置vue-router</TimelineItem>
      <TimelineItem color="green">状态管理树vuex</TimelineItem>
      <TimelineItem color="green">阿里图标库iconfont</TimelineItem>
      <TimelineItem color="green">加密和解密aes</TimelineItem>
      <TimelineItem color="green">城市联级iview-area</TimelineItem>
      <TimelineItem color="green">高德地图AMap</TimelineItem>
      <TimelineItem color="green">多语言vue-i18n</TimelineItem>
      <TimelineItem color="green">发布1.0版本,自带登录页login,用户中心板块页和错误页errorPage</TimelineItem>
      <TimelineItem color="green">扩展自定义组件,自定义网络请求,富文本编辑器,一键换肤色,响应式布局</TimelineItem>
      <TimelineItem color="blue">防抖和节流</TimelineItem>
      <TimelineItem color="red">目前暂无</TimelineItem>
    </Timeline>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      console.log(this)
    },
    methods: {
    },
  };
</script>