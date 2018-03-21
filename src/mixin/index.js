import Vue from 'vue'

var mixin = {
  
  methods: {
    aa(){
      console.log('11')
    },
    //时间戳转成日期
    formatDate(time,type){
      if(isNaN(time)||time==null||time==''||time==undefined){
        return '';
      }
      var tmpDate = new Date(parseInt(time));
      var year = tmpDate.getFullYear();
      var month = this.addZero(tmpDate.getMonth() + 1);
      var day = this.addZero(tmpDate.getDate());
      var hours = this.addZero(tmpDate.getHours());
      var minutes = this.addZero(tmpDate.getMinutes());
      var seconds = this.addZero(tmpDate.getSeconds());       
      if(type=='yyyy年mm月dd日'){
        return year + '年' + month + '月' + day + '日';
      }else if(type=='yyyy-mm-dd'){
        return year + '-' + month + '-' + day;
      }else if(type=='yyyy-mm'){
        return year + '-' + month;
      }else if(type=='hh-mm-ss'){
        return hours + ':' + minutes;
      }else if(type=='hh:mm:ss'){
        return hours + ':' + minutes;
      }else if(type=='hh:mm'){
        return hours + ':' + minutes;
      }else if(type=='yyyy'){
        return year;
      }else if(type=='yyyy-mm-dd hh:mm'){
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
      }else if(type=='yyyy-mm-dd hh:mm:ss'){
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes+ ':' + seconds;
      }else{
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
      }
    },
    addZero(time){
      var d=['00','01','02','03','04','05','06','07','08','09'] 
      if (parseInt(time)<10) {
        return d[time]
      }else{
        return time
      }
    },
  }
}
mixin.methods.aa()
Vue.mixin(mixin)

// Vue.aa()
