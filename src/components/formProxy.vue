<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {};
    },

    mounted() {
      console.info(this.$slots.default);
    }
  };
</script>

<style>
</style>
