<template>
  <div class="single-main">
    <users />
  </div>
</template>

<script>
  import account from './account.vue';
  import message from './message.vue';
  import users from './users.vue';

  export default {
    name: '',
    data() {
      return {
        currName: 'stalker'
      };
    },

    methods: {
      handleClick(name) {
        this.currName = name;
      }
    },

    components: {
      account, message, users
    },

    mounted() {
    }
  };
</script>

<style>
</style>
