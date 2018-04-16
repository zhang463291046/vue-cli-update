<template>
  <div class="nav">
    <Breadcrumb>
      <BreadcrumbItem
        v-for="(item, index) in items"
        :key="index"
      >
        {{item.name}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        items: [],
        options: []
      }
    },
    watch: {
      '$route'(val) {
        this.items.push(val)
      }
    },
    mounted() {
      this.options = this.$router.history.router.options.routes;
      this.items.push(this.$route)
      console.info(this.$router)
      console.info('2:', this.$router.history.router.options.routes)
    }
  }
</script>

<style>
</style>
