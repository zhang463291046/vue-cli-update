<template>
  <div class="page">
    <h1>加密和解密aes</h1>
    <Input v-model="value" placeholder="请输入需要加密的字符串" style="width: 300px"></Input>
    <Button type="info" @click="Encrypt">加密</Button>
    <Button type="success" @click="Decrypt">解密</Button>
    <div>结果:<span>{{aesValue}}</span></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value:'',
        aesValue:'',
      }
    },

    mounted () {
      
    },
    
    methods: {
      // 加密
      Encrypt(){
        this.aesValue = this.$aesEncrypt(this.value);
      },
      // 解密
      Decrypt(){
        this.aesValue = this.$aesDecrypt(this.aesValue);
      },
    },
  };
</script>