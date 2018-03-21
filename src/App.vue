<template>
  <div id="app">
    <img src="./assets/logo.png">{{ message | capitalize}}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      message:'abc'
    }
  },
  mounted () {
    var a =new Date().Format('yyyy-MM-ss')
    console.log(a)
    console.log(this)
    this.handleQuery();
    
    this.formatDate('','yyyy-MM-ss')
    this.aa();
  },
  methods: {
    handleQuery() {
      this.$http.post(
        'login/do_login',
        {
          username:'18036093000',
          pwd:'123456'
        }
        ).then(res => {
          console.log('res',res);
        });
    },
  }    
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
