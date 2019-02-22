<template>
  <li @click.stop="handleSelect(model)">
    <div class="tree-item" @mouseover="show=true" @mouseout="show=false">
        <i v-for="i in deep" class="space"></i>
        <span class="item-text" :class="{active: selectedModelId == model.id}">{{model.label}}</span>

        <span v-if="hasChildren || (canEdit && deep<1)" class="icon-2x">
          <button @click.stop="toggle" class="btn-none"><i :class="{'ivu-icon ivu-icon-chevron-right':!isOpen,'ivu-icon ivu-icon-chevron-down':isOpen }"></i> </button>
        </span>

        <span v-if="canEdit" v-show="show" class="buttonMenu" transition="expand">
            <!-- 新增 -->
            <button v-if="isShowAdd&&(!model.isLastChild)" @click.stop="add(model)" class="btn-none" title="新增"><i class="ivu-icon ivu-icon-plus"></i> </button>
            <!-- 编辑 -->
            <button v-if="isShowEdit" @click.stop="edit(model)" class="btn-none" title="编辑"><i class="ivu-icon ivu-icon-edit"></i> </button>
            <!-- 删除 -->
            <button v-if="isShowRemove" @click.stop="remove(model)" class="btn-none" title="删除"><i class="ivu-icon ivu-icon-trash-b"></i> </button>
        </span>
    </div>
    <dt-ul 
      v-if="hasChildren"
      v-show="isOpen" 
      :model="model.children" 
      :deep="nextDeep"
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
    </dt-ul>
  </li>
</template>

<script>
  export default {
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
    data () {
      return {
        isOpen:this.open,
        nextDeep: this.deep + 1,
        show: false,
        // checked: false,
      }
    },
    computed: {
        //是否有孩子
        hasChildren () {
            return this.model.children && this.model.children.length;
        },
        checked: {
            get() {
                return this.checkedIds.indexOf(this.model.id) > -1;
            },
            set(value) {
                console.log(this.model)
                if(value && this.checkedIds.indexOf(this.model.id) === -1){
                    if(this.checkedIds.indexOf(this.model.parentId) == -1){
                        this.checkedIds.push(this.model.parentId)
                    }
                    if (this.model.isChildren) {
                        for (var i = this.model.childrenList.length - 1; i >= 0; i--) {
                            const item = this.model.childrenList[i].id
                            if(this.checkedIds.indexOf(item) == -1){
                                this.checkedIds.push(item)
                            }
                        }
                    }
                    this.checkedIds.push(this.model.id)
                }
                if(!value){
                    var i = this.checkedIds.indexOf(this.model.id);
                    if(i !== -1) {
                        this.checkedIds.splice(i, 1);
                    }
                    if (this.model.isChildren) {
                        for (var i = this.model.childrenList.length - 1; i >= 0; i--) {
                            const item = this.model.childrenList[i].id
                            var p = this.checkedIds.indexOf(item);
                            if(p !== -1) {
                                this.checkedIds.splice(p, 1);
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        handleSelect(model) {
            this.$emit('select', model);
        },
        add(model) {
            this.$emit('addChild', model);
        },
        edit(model) {
            this.$emit('editModel', model);
        },
        remove(model) {
            this.$emit('deleteModel', model);
        },
        toggle() {
            this.isOpen = !this.isOpen;
        }
    },
  }
</script>

<style lang="less" scoped>
.ms-ul-parent{
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
  margin-top: -1px;
  padding:0px 70px 0px 10px;
  cursor: pointer;
  position: relative;
}
.icon-2x {
  position: absolute;
  right: 5px;
  top: 0px;
}
.buttonMenu{
  position: absolute;
  right: 22px;
  top: 0px;
}
.tree-item:hover{
  color: #157CBF;
}
.active{
  color: #157CBF;
}
.space{
  width: 10px;
  height: 1px;
  display: inline-block;
}
</style>
