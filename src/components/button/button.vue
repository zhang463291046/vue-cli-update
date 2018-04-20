<template>
  <div @click="handleClick">
    我是个按钮
  </div>
</template>

<script>
  export default {
    name: 'button',
    props: {
      
    },
    data() {
      return {

      };
    },
    computed: {
      
    },
    methods: {
      handleClick() {
        console.log('---button组件---','你点击我啦');
      }
    },

    mounted() {

    }
  };
</script>
