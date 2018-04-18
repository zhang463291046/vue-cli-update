<template>
  <div class="slide-page">
    <div class="slide-page-mask" v-show="visible" @click.stop="mask"></div>
    <div class="slide-page-wrap" v-show="visible" @click.self="handleWrapClick">
      <div class="slide-page-model">
        <div class="slide-page-content">
          <a class="slide-page-close" @click="close">
            <Icon type="close" size="16"></Icon>
          </a>
          <div class="slide-page-hearder">
            <h3><em></em><i>{{currTitle}}</i></h3>
          </div>
          <div class="slide-page-body">
            <slot></slot>
          </div>
          <div class="slide-page-footer">
            <slot name="footer">
              <Button type="primary" size="large" @click.native="ok">保存</Button>
              <Button type="ghost" size="large" @click.native="cancel">取消</Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slidePage',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: ''
    },
  },
  data() {
    return {
      currTitle: this.title,
      visible: this.value
    }
  },
  watch: {
    value (val) {
        this.visible = val;
    }
  },
  methods: {
    handleWrapClick () {
      this.close();
    },
    mask() {
      this.close();
    },
    cancel(){
      this.close();
    },
    ok(){
      this.close();
      this.$emit('on-ok');
    },
    close () {
      this.visible = false;
      this.$emit('input', false);
    },
  },
  
}
</script>

<style lang="less" scoped>
.slide-page-mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 1000;
  background-color: rgba(55,55,55,.6);
}
.slide-page-wrap{
  position: fixed;
  overflow: auto;
  outline: 0;
  right: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000; 
}
.slide-page-model{
  position: relative;
  float: right;
  width: 520px;
  outline: 0;
  background: #fff;
  height: 100%;
}
.slide-page-content{
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: 6px;
  background-clip: padding-box;
}
.slide-page-close{
  position: absolute;
  top: 15px;
  right: 20px;
}
.slide-page-hearder{
  padding: 10px 15px;
  border-bottom: 1px solid #F3F3F3;
  h3{
    height: 30px;
    line-height: 30px;
    background: #FFF;
    font-size: 16px;
    em{
      display: inline-block;
      width: 4px;
      height: 16px;
      vertical-align: middle;
      background: #0097FF;
      border-radius: 2px 2px 2px 2px;
      margin-right: 10px;
    }
    i{
      display: inline-block;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
  }
}
.slide-page-body{
  padding: 10px 15px;
}
.slide-page-footer{
  padding: 10px 15px;
  text-align: center;
}
</style>
