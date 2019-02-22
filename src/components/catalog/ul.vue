<template>
  <ul class="ms-tree-list" :class="{'ms-ul-parent':deep<1,'ms-ul-children':!deep<1}">
    <li v-if="deep<1 && isAddRoot" @click.stop="handleRoot(model)" style="background-color: white;text-align: center;">
      <div class="tree-item">
        <span style="color:#157CBF;font-weight: bolder;">
          <i class="el-icon-plus"></i>添加
        </span>
      </div>
    </li>
    <vue-li 
      v-for="(item,index) in model"
      :model="item" 
      :key="index" 
      :deep="deep" 
      :open="open"
      :selected-model-id="selectedModelId"
      :can-check="canCheck" 
      :checked-ids="checkedIds"  
      :can-edit="canEdit"
      :is-show-edit="isShowEdit"  
      :is-show-remove="isShowRemove"  
      @addChild="add" 
      @deleteModel="remove" 
      @editModel="edit"
      @select="handleSelect">
      </vue-li>
    </ul>
</template>

<script>
  import vueLi from './li.vue';
  export default {
    components: {
      'vue-li': vueLi
    },
    props: {
      model: null,
      // 层级: 0为第一层,即根层
      deep: {
          type: Number,
          default: 0
      },
      // 选择的id
      selectedModelId: null,
      // 显示复选框
      canCheck: {
          type: Boolean,
          default: false
      },
      checkedIds: [],
      // 显示展开
      open:{
          type: Boolean,
          default: false
      },
      // 显示操作
      canEdit: {
          type: Boolean,
          default: false
      },
      // 添加显示Root
      isAddRoot: {
          type: Boolean,
          default: false
      },
      // 添加显示
      isShowAdd:{
          type: Boolean,
          default: true
      },
      // 编辑显示
      isShowEdit: {
          type: Boolean,
          default: true
      },
      // 删除显示
      isShowRemove: {
          type: Boolean,
          default: true
      }
    },
    data() {
      return {
          
      }
    },
    mounted () {
      console.log(this.deep)
    },
    methods: {
      // 选择的select
      handleSelect(model) {
        this.$emit('select', model);
      },
      // 添加root
      handleRoot(model) {
        this.$emit('addRoot', model);
      },
      // 添加child
      add(model) {
        this.$emit('addChild', model);
      },
      // 编辑child
      edit(model) {
        this.$emit('editModel', model);
      },
      // 删除child
      remove(model) {
        this.$emit('deleteModel', model);
      }
    },
  }
</script>

<style lang="less" scoped>
ul.ms-tree-list {
  list-style: none;
}
.ms-ul-parent{
  max-height: 800px;
  overflow-y: auto;
  background-color: #e0e6ed;
  // color:white;
  .btn-none {
    background: none;
    border:none;
    outline:none;
    color:#157CBF;
    cursor: pointer;
    width: 15px;
  }
}
.ms-ul-children{
  background-color: #fff;
  // color:#157CBF;
  .btn-none {
    background: none;
    border:none;
    outline:none;
    color:#157CBF;
    cursor: pointer;
    width: 15px;
  }
}
.tree-item{
    line-height: 30px;
    border: 1px solid #dddddd;
    padding:0px 10px;
    cursor: pointer;
    position: relative;
}
</style>
