
<template>
  <ul class="ms-tree-list" :class="{'ms-ul-parent':isParent,'ms-ul-children':!isParent}">
    <li v-if="deep<=1 && isAddRoot" @click.stop="handleRoot(model)" style="background-color: white;text-align: center;">
      <div class="tree-item">
        <span style="color:#157CBF;font-weight: bolder;">
          <i class="el-icon-plus"></i>添加
        </span>
      </div>
    </li>
    <vue-li 
      v-for="(item,index) in model"
      :key="index" 
      :open="open" 
      :checked-ids="checkedIds" 
      :can-edit="canEdit" 
      :can-check="canCheck"  
      :is-show-edit="isShowEdit"  
      :is-show-remove="isShowRemove"  
      :selected-model-id="selectedModelId" 
      :deep="deep" 
      :model="item" 
      :parentId="item.isParent" 
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
        props: {
            model: null,
            isParent: {
                type: Boolean,
                default: true
            },
            isAddRoot: {
                type: Boolean,
                default: false
            },
            isButtomAdd: {
                type: Boolean,
                default: false
            },
            deep: {
                type: Number,
                default: 0
            },
            selectedModelId: null,
            checkedIds: [],
            canCheck: {
                type: Boolean,
                default: false
            },
            canEdit: {
                type: Boolean,
                default: false
            },
            canAdd:{
                type: Boolean,
                default: false
            },
            open:{
                type: Boolean,
                default: false
            },
            isShowAdd:{
                type: Boolean,
                default: true
            },
            isShowEdit: {
                type: Boolean,
                default: true
            },
            isShowRemove: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            handleSelect(model) {
                this.$emit('select', model);
            },
            handleRoot(model) {
                this.$emit('addRoot', model);
            },
            add(model) {
                this.$emit('addChild', model);
            },
            edit(model) {
                this.$emit('editModel', model);
            },
            remove(model) {
                this.$emit('deleteModel', model);
            }
        },
        components: {
            'vue-li': vueLi
        }
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
