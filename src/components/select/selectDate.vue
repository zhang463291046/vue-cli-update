<template>
  <span>
    <DatePicker :value="start_time" type="date" placeholder="请选择开始时间" style="width: 150px" :options="options1" @on-change="dateChange1"></DatePicker>
    <DatePicker :value="end_time" type="date" placeholder="请选择截止时间" style="width: 150px" :options="options2" @on-change="dateChange2"></DatePicker>
  </span>
</template>

<script>
// 开始时间和截止时间不能大于当前时间,截止时间不能小于开始时间
export default {
  data () {
    return {
      start_time: '',
      end_time: '',
    }
  },
  computed: {
    options1: function() {
      var _edate = this.end_time;
      return {
        disabledDate(time) {
          if (_edate) {
            return (
              time.getTime() > Date.parse(new Date(_edate))
            )
          } else {
            return (
              time.getTime() > Date.now()
            );
          }
        }
      };
    },
    options2: function() {
      var _sdate = this.start_time;
      return {
        disabledDate(time) {
          if (_sdate) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.parse(new Date(_sdate)) - 8.64e7
            )
          } else {
            return (
              time.getTime() > Date.now()
            );
          }
        }
      };
    }
  },
  methods: {
    dateChange1(val) {
      this.start_time = val;
      this.select();
    },
    dateChange2(val) {
      this.end_time = val;
      this.select();
    },
    select () {
      this.$emit('on-select',[this.start_time,this.end_time]);
    },
    setDate(start_time,end_time) {
      this.start_time = start_time;
      this.end_time = end_time;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
