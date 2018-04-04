<template>
  <div class="save-field">
    <input v-model.trim="currValue" type="text" v-bind="$attrs"/>
  </div>
</template>

<script>
  export default {
    name: 'dtSaveField',

    props: {
      value: String
    },

    data () {
      return {
        currValue: this.value
      };
    },

    mounted () {
    }
  };
</script>

<style lang="less">
  .save-field{
    width: 100%;
    height: 35px;
    background: #FFFFFF;
    box-shadow: 0 2px 2px 0 rgba(202,213,230,0.30);
    border-radius: 2px;
    margin: 0px auto;

    input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 2px 5px;
      color: #6F6F6F;
      outline: none;
      border:1px solid #dddee1;
      transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
      &:focus {
        border: 1px solid #74A7FF;
      }

      &::-webkit-input-placeholder { /* WebKit browsers */
        color: #b0b0b0;
      }
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #b0b0b0;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #b0b0b0;
      }
      & :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #b0b0b0;
      }
    }
  }
</style>
