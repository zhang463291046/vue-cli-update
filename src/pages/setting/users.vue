<template>
  <div class="pd-20">
    <div class="single-bar">
      <div class="left">
        <dt-search @onSearch="handleSearch" placeholder="请输入用户名或电话号码搜索"/>
      </div>
      <div class="right">
        <dt-button class="flbtn" @click="handleAdd('')">添加</dt-button>
      </div>
    </div>
    <div class="mt-20">
      <Tabs v-model="currName" class="mytab" @on-click="handleClick">
        <TabPane label="管理员" name="1">
          <manager v-if="currName == '1'" :content="content" :currName="currName"/>
        </TabPane>
        <TabPane label="责任人" name="3">
          <responser v-if="currName == '3'" :content="content" :currName="currName"/>
        </TabPane>
        <TabPane label="用户" name="2">
          <user v-if="currName == '2'" :content="content" :currName="currName"/>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import editUser from './sub/editUser.vue';
  import manager from './sub/manager'
  import responser from './sub/responser'
  import user from './sub/user'
  import { getSessionStorage, setSessionStorage } from '../../common/utils';
  export default {
    name: '',
    data() {
      return {
        flag: true,
        content: '',
        currName: '1'
      };
    },

    created() {
      const name = getSessionStorage('userTabName') || '1';
      this.currName = name + '';
    },

    methods: {
      handleSearch(v) {
        this.content = v;
      },
      handleAdd(id) {
        const currName = this.currName;
        this.$router.$push({ name: 'editUsers', params: { id, currName } });
      },
      handleClick(name) {
        this.content = '';
        this.currName = name;
        setSessionStorage('userTabName', name);
      }
    },

    mounted() {

    },

    components: {
      manager,
      responser,
      user,
      editUser
    }
  };
</script>

<style lang="less">
  .tab-li {
    list-style: none;

    li {
      cursor: pointer;
      float: left;
      color: #9B9B9B;
      padding: 5px 0px;
      margin-right: 70px;

      &:active, &.active {
        color: #74A7FF;
        border-bottom: 3px solid #74A7FF;
      }
    }
  }
</style>
