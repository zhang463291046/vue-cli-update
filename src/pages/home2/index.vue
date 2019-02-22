<template>
  <div class="page">
    <h1>mockjs模拟数据</h1>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          输入框：<Input v-model="params.key1" class="dt-search-input" placeholder="请输入输入框" />
        </div>
        <div class="dt-search-cell">
          选择：<dt-select v-model="params.key2" class="dt-search-select" url="deviceType"/>
        </div>
        <div class="dt-search-cell">
          选择2：<dt-selectUrl v-model="params.key3" class="dt-search-select" url="device/get_select"/>
        </div>
        <div class="dt-search-cell">
          时间：<DatePicker type="date" placeholder="请选择时间" class="dt-search-date" @on-change="dateChange"></DatePicker>
        </div>
        <div class="dt-search-cell">
          时间段：<dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
        </div>
        <div class="dt-search-cell">
          区域：<al-selector data-type="name" level="2" v-model="params.key7" class="dt-search-area"/>
        </div>
        <div class="dt-search-cell">
          <Button type="ghost" @click="handleSearch">查询</Button>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="error" @click="handleTableSelect">批量删除</Button>
        <Button type="info" @click="handleAdd">新增</Button>
      </div>
    </div>

    <dt-table ref="table" url="device/get_list" :params="params" :columns="columns"></dt-table>

    <dt-slidePage v-model="modal1" :title="modelTitle">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="输入框" prop="form1" required>
          <Input v-model="formData.form1" placeholder="请输入输入框"></Input>
        </FormItem>
        <FormItem label="选择" prop="form2">
          <dt-select v-model="formData.form2" url="deviceTypeModal"/>
        </FormItem>
        <FormItem label="选择2" prop="form3">
          <dt-selectUrl v-model="formData.form3" url="device/get_select"/>
        </FormItem>
        <FormItem label="时间" prop="form4">
          <DatePicker :value="formData.form4" type="date" placeholder="请选择时间" style="width: 100%" @on-change="dateChangeModal"></DatePicker>
        </FormItem>
        <FormItem label="时间段" prop="form5">
          <dt-selectDate ref="date" @on-select="handleDateSelectModal"/>
        </FormItem>
        <FormItem label="区域" prop="form7">
          <al-selector ref="selector" data-type="name" v-model="formData.form7" level="2" style="display: flow-root"/>
        </FormItem>
        <FormItem label="详细地址" prop="form8">
          <dt-AMapAddress ref="AMapAddress"/>
        </FormItem>
        <FormItem>
            <Button type="ghost" @click="handleSubmit()">保存</Button>
            <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </dt-slidePage>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {
          key1: '',
          key2: '',
          key3: '',
          key4: '',
          key5: '',
          key6: '',
          key7: [],
        },
        columns: [
          { type: 'selection',width: 60},
          { title: '标题1', key: 'key1' },
          { title: '标题2', key: 'key2' },
          { title: '标题3', key: 'key3' },
          { title: '标题4', key: 'key4' },
          { title: '标题5', key: 'key5' },
          { title: '标题6', key: 'key6' },
          { title: '过滤器', 
            render: (h, params) => {
              return h('span', {}, this.$filter.deviceTypeFilter(params.row.key7));
            }
          },
          { title: '操作', 
            key: 'operation' ,
            width: 200,
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small',
                        icon: 'edit'
                      },
                      style: {
                        marginRight: '10px'
                      },
                      on: {
                        click: () => {
                          console.log('点击事件',params.row.key1)
                          this.handleEdit(params.row);
                        }
                      }
                  }, '编辑'),
                  h('Button', {
                      props: {
                        type: 'error',
                        size: 'small',
                        icon: 'trash-a'
                      },
                      on: {
                        click: () => {
                          console.log('点击事件',params.row.key1)
                          this.handleRemove('device/get_list',{id:params.row.key1})
                        }
                      }
                  }, '删除')
              ]);
            }
          }
        ],
        itemId: 0,
        modal1: false,
        formData: {
          form1: '',
          form2: '',
          form3: '',
          form4: '',
          form5: '',
          form6: '',
          form7: ['河北省', '张家口市', '怀来县'],
          form8: '',
        },
        rule: {
          
        }
      }
    },
    computed: {
      modelTitle(){
        return this.itemId?'编辑':'新增'
      }
    },
    mounted () {
    },
    methods: {
      dateChange(val) {
        this.params.key4 = val;
      },
      dateChangeModal(val) {
        this.formData.key4 = val;
      },
      handleDateSelect(val){
        console.log(val)
        this.params.key5 = val[0];
        this.params.key6 = val[1];
      },
      handleDateSelectModal(val){
        console.log(val)
        this.formData.key5 = val[0];
        this.formData.key6 = val[1];
      },
      handleTableSelect(){
        //获取选中的列表项,默认返回id数组,支持传参getSelect('key1');
        var arr = this.$refs.table.getSelect();
        if(arr.length > 0){
          this.handleRemove('device/get_list',{id: arr.join(',')});
        }else {
          this.$Message.warning('请选择至少一项');
        }
      },
      handleAdd(){
        this.modal1 = true;
        this.itemId = 0;
        this.$refs.form.resetFields();
        this.$refs.date.setDate('','');
      },
      handleEdit(item){
        this.modal1 = true;
        this.itemId = item.id;
        this.$refs.form.resetFields();
        // 设置时间段数据
        this.$refs.date.setDate('2019-02-01','2019-02-28');
        // 设置地址选择器
        this.$refs.selector.isInit = true;
        this.formData.form7 = ['广东省','深圳市','宝安区'];
        // 设置地图点数据
        this.$refs.AMapAddress.setPosition({
          value: '腾讯大厦',
          longitude: '113.934457',
          latitude: '22.540822',
        });
      },
      handleSubmit(){
        // 获取地图点数据
        var position = this.$refs.AMapAddress.getPosition();
        console.log('地图点位置',position);
        // 自定义验证规则
        let vArr = [
          [this.formData.form1, '输入框', 'empty|password'],
        ];
        this.$validate(vArr).then(valid => {
          console.log('自定义表单验证valid',valid);
          this.modal1 = false;
        });
      },
    },
  };
</script>