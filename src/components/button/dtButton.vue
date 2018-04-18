<template>
  <div class="dt-button" @click="handleClick">
    123456
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
      return {

      };
    },
    computed: {
      
    },
    methods: {
      handleClick(e) {
        console.log(e);
      }
    },

    mounted() {

    }
  };
</script>
