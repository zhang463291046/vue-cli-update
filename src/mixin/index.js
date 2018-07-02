/*全局混入对象,会插入到每一个组件中,需要慎用*/
import Vue from 'vue'

var mixin = {  
  methods: {
    //跳转地址
  	handleRouter(name){
  		this.$router.push({name});
  	},
  	//返回上一页
  	handleBack(){
  		this.$router.go(-1)
  	},
  	//查询数据列表
  	handleSearch() {
	    this.params = Object.assign({}, this.params);
	  },
  	//删除某条数据
  	handleRemove(url,itemId) {
	    this.$http.post(url, {id: itemId}).then(res=>{
	      this.$Message.success('删除成功');
	      this.handleSearch();
	    })
	  },
    formatDate(){
      console.log('---mixin---','混入对象')
    },
  }
}

Vue.mixin(mixin)
