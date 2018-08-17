<template>
  <div>
    <Row :gutter="10">
      <Col span="8">
        <Select 
          ref="prov"
          v-model="currProvince"
          @on-change="provinceChange"
          placeholder="请选择省"
          not-found-text="暂无数据"
          transfer
          style="width:100%">
          <Option v-for="item in provinceList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <Select 
          ref="prov"
          v-model="currCity"
          @on-change="cityChange"
          placeholder="请选择市"
          not-found-text="暂无数据"
          transfer
          style="width:100%">
          <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <Select 
          ref="prov"
          v-model="currCountry"
          @on-change="countryChange"
          placeholder="请选择区"
          not-found-text="暂无数据"
          transfer
          style="width:100%">
          <Option v-for="item in countryList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="8">
        {{ currProvince }}
        <pre>{{ provinceList }}</pre>
      </Col>
      <Col span="8">
        {{ currCity }}
        <pre>{{ cityList }}</pre>
      </Col>
      <Col span="8">
        {{ currCountry }}
        <pre>{{ countryList }}</pre>
      </Col>
    </Row>
  </div>
</template>

<script>
import areaData from './areaData.js'
export default {
  name:'alSelector',
  props: {
    defaultValue: {
      type: Array
    },
  },
  data() {
    return {
      currProvince: '',
      currCity: '',
      currCountry: '',
      provinceList: [],
      cityList: [],
      countryList: [],
      provinceListOjb:[],
      cityListOjb:[],
      countryOjb:[],
    }
  },
  computed: {
    
  },
  watch: {
    defaultValue (val) {
      console.log('val',val)
      // this.currProvince = val[0];
      // this.currCity = val[1];
      // this.currCountry = val[2];
    },
    currProvince (val,oldVal) {
      console.log('province',val,oldVal);
      if(val!=''){
        var code = this.getIndex(this.provinceListOjb,val);
        this.cityListOjb = areaData[code];
        this.cityList = Object.values(areaData[code]);
        if(oldVal != ''){
          this.currCity = this.cityList[0];
        }
      }
      console.log(this.currProvince)
      console.log(this.currCity)
      console.log(this.currCountry)
      console.log(this.cityListOjb)
      console.log(this.cityList)
    },
    currCity (val,oldVal) {
      console.log('city',val)
      if(val!=''){
        var code = this.getIndex(this.cityListOjb,val);
        this.countryListOjb = this.cityListOjb[code];
        this.countryList = Object.values(areaData[code]);
        if(oldVal != ''){
          this.currCountry = this.countryList[0];
        }
      }
      
      console.log(this.currProvince)
      console.log(this.currCity)
      console.log(this.currCountry)
      console.log(this.countryListOjb)
      console.log(this.countryList)
    },
    currCountry (val) {
      console.log(val)
    },
  },
  mounted () {
    this.provinceListOjb = areaData[86];
    this.provinceList = Object.values(areaData[86]);
  },
  methods: {
    getIndex(list,name){
      for (const i in list) {
        if (list[i] === name) {
          return i;
        }
      }
    }, 
    provinceChange(val){
      console.log('provinceChange',val)
    },
    cityChange(val){
      console.log('cityChange',val)
    },
    countryChange(val){
      console.log('countryChange',val)
    },
  }
}
</script>
