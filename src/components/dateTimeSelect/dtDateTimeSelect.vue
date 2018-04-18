<template>
  <div>
      <DatePicker
        v-model="date"
        type="date"
        :options="options"
        :clearable="false"
        placeholder="请选择日期"
        @on-change="handleDateChange"
        style="width: 127px"></DatePicker>

    <Select
      v-model="time"
      style="width:127px"
      placeholder="请选择时间"
      clearable
      @on-change="handleSelectChange"
    >
      <Option v-for="item in timeList" :value="item" :key="item">{{ item }}</Option>
    </Select>
  </div>
</template>

<script>
  const today = new Date();

  export default {
    name: '',
    data () {
      return {
        options: {
          disabledDate (date) {
            return date && date.valueOf() >= Date.now();
          }
        },
        date: today,
        time: '01'
      };
    },

    methods: {
      handleDateChange(date) {
        // 因为on-change事件是在input事件之前
        this.doEmit(date);
        console.info('date：', date);
      },
      handleSelectChange(val) {
        let dateStr = '';
        if (this.date) {
          dateStr = this.date.Format('yyyy-MM-dd');
        }
        this.doEmit(dateStr);
      },
      doEmit(date) {
        this.$emit('on-change', date, this.time);
      }
    },

    computed: {
      timeList () {
        let hours = 24;
        // 当天时间
        if (this.date && Object.prototype.toString.call(this.date)) {
          if (this.date.getFullYear() === today.getFullYear() &&
              this.date.getMonth() === today.getMonth() &&
              this.date.getDay() === today.getDay()
          ) {
            hours = today.getHours();
          }
        }
        const hourArr = [];
        for (let i = 0; i < hours; i++) {
          if (i < 10) {
            hourArr.push(`0${i}`);
          } else {
            hourArr.push(i);
          }
        }
        return hourArr;
      }
    },

    mounted () {
    }
  };
</script>

<style>
</style>
