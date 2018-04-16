<template>
  <div class="dt-button" :class="clas" @click="handleClick">
    <img v-if="icon" src="../assets/but_add@3x.png" class="dt-button-img"/>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'dtButton',
    props: {
      icon: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'priamry'
      },
      size: {
        type: String,
        default: 'normal'
      },
      ghost: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      clas() {
        const arr = [];
        arr.push(this.type);
        arr.push(this.size);
        if (this.ghost) {
          arr.push('ghost');
        }
        return arr.join(' ');
      }
    },
    methods: {
      handleClick(e) {
        console.log(e);
        this.$emit('click', e);
      }
    },

    mounted() {
    }
  };
</script>

<style lang="less">
  .dt-button{
    height: 32px;
    line-height: 32px;
    background-color: #74A7FF;
    color: #FFF;
    vertical-align: middle;
    text-align: center;
    padding-left: 30px;
    padding-right: 30px;
    cursor: pointer;
    font-size: 14px;
    user-select: none;

    &:hover{
      background-color: #79bcff;
    }
    &:active{
      background-color: #7FABE8;
    }
    &.warning{
      background-color: #FAC857;
      color: #FFF;

      &:hover{
      background-color: #ffd473;
      }
      &:active{
        background-color: #eab854;
      }
    }
    &.gray{
      background-color: #95A1C0;
      color: #FFF;

      &:hover{
        background-color: #a0adcc;
      }
      &:active{
        background-color: #8c9ab9;
      }
    }
    &.error{
      background-color: #F57575;
      &:hover{
        background-color: #fe9897;
      }
      &:active{
        background-color: #e87373;
      }
    }

    &.mini{
      height: auto;
      line-height: 1;
      padding: 6px 15px;
      display: inline-block;
    }
    &.ghost{
      background-color: #FFF;
      color: #74A7FF;
      border: 1px solid #74A7FF;

      &:hover{
        color: #79bcff;
        border: 1px solid #79bcff;
      }
      &:active{
        color: #7FABE8;
        border: 1px solid #7FABE8;
      }
      &.warning{
        background-color: #FFF;
        color: #FAC857;
        border: 1px solid #FAC857;

        &:hover{
          color: #ffd473;
          border: 1px solid #ffd473;
        }
        &:active{
          color: #eab854;
          border: 1px solid #eab854;
        }
      }
      &.gray{
        background-color: #FFF;
        color: #95A1C0;
        border: 1px solid #95A1C0;

        &:hover{
          color: #a0adcc;
          border: 1px solid #a0adcc;
        }
        &:active{
          color: #8c9ab9;
          border: 1px solid #8c9ab9;
        }
      }
      &.error{
        background-color: #FFF;
        color: #F57575;
        border: 1px solid #F57575;
        &:hover{
          color: #fe9897;
          border: 1px solid #fe9897;
        }
        &:active{
          color: #e87373;
          border: 1px solid #e87373;
        }
      }
    }

    .dt-button-img{
      width: 14px;
      height: 14px;
      vertical-align: middle;
      margin-right: 5px;

    }

  }
</style>
