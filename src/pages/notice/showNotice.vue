<template>
  <div class="single-main sub-main">
    <div class="single-bar">
      <div class="left">
        <dt-back />
      </div>
    </div>

    <div class="sub-main-wrap">
      <div class="showNotice">
        <div class="noticeItem">
          <div class="itemTtile">标题：</div>
          <div class="itemContent">{{form.title}}</div>
        </div>
        <div class="noticeItem">
          <div class="itemTtile">发布人：</div>
          <div class="itemContent">{{userInfo.real_name}}</div>
        </div>
        <div class="noticeItem">
          <div class="itemTtile">发布时间：</div>
          <div class="itemContent">{{form.publish_time}}</div>
        </div>
        <div class="noticeItem">
          <div class="itemTtile">过期时间：</div>
          <div class="itemContent">{{form.expire_time}}</div>
        </div>
        <div class="noticeItem">
          <div class="itemTtile">公告内容：</div>
          <div class="itemContent area">
            {{form.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cdao from '../commonDao';
  import { mapGetters } from 'vuex';
  export default {
    name: '',
    data() {
      return {
        form: {
          id: '',
          title: '',
          content: '',
          expire_time: '',
          publish_time: ''
        }
      }
    },
    computed:{
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    methods: {
      async loadInfo() {
        const data = await cdao.noticeGetInfo(this.id);
        if (data) {
          this.form = data
        }
      }
    },

    mounted() {
      const id = this.$routeP.params.id;
      this.id = id;
      this.loadInfo();
    }
  }
</script>

<style lang="less">
  .showNotice{
    font-size: 14px;
    color: #200000;
    line-height: 54px;

    .noticeItem{
      height: 40px;
      line-height: 40px;
      margin-bottom: 14px;
    }
    .itemTtile{
      display: inline-block;
      width: 100px;
      text-align: right;
      vertical-align: top;
    }

    .itemContent{
      display: inline-block;
      width: 600px;
      background: #F6F7FB;
      padding-left: 10px;
    }

    .area{
      min-height: 200px;
      max-height: 450px;
      overflow-y: auto;
      word-wrap: break-word;
      text-indent: 28px;
      text-align: justify;
    }

  }
</style>
