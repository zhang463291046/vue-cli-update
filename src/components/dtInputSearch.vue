<template>
  <Input 
    v-model.trim="currValue" 
    icon="search" 
    :placeholder="currPlaceholder" 
    style="width: 200px" 
    @on-click="handleClick">
  </Input>
</template>

<script>
  export default {
    name: '',
    props: {
      placeholder: {
        default: '请输入',
        type: String
      }
    },
    data() {
      return {
        currValue: '',
        currPlaceholder: this.placeholder,
      };
    },
    watch: {
      currValue() {
        this.$emit('input', this.currValue);
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('onSearch', this.currValue);
      }
    },

    mounted() {
    }
  };
</script>

<style lang="less">
  .dt-search-wrap{
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 300px;
    height: 32px;

    .icon{
      position: absolute;
      width: 16px;
      height: 16px;
      line-height: 32px;
      text-align: center;
      left: 8px;
      top: 8px;
      z-index: 3;
      cursor: pointer;
    }

    input{
      display:inline-block;
      width:100%;
      height:32px;
      line-height:1.5;
      padding:4px 7px;
      font-size:12px;
      border:1px solid #dddee1;
      border-radius:4px;
      color:#495060;
      background-color:#fff;
      background-image:none;
      position:relative;
      cursor:text;
      outline:none;
      transition:border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;

      &:focus{
        border-color:#57a3f3;outline:0;box-shadow:0 0 0 2px rgba(45,140,240,.2)
      }

      &::-webkit-input-placeholder { /* WebKit browsers */
        color: #A3B4CE;
      }
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #A3B4CE;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #A3B4CE;
      }
      & :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #A3B4CE;
      }
    }

    .icon + input {
      padding-left: 32px;
    }

  }
</style>
