<template>
  <div class="page">
    <h1>mockjs模拟数据</h1>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        条件1：<Input v-model="params.key1" class="dt-search-input" placeholder="请输入条件1" />
      </div>
      <div class="dt-search-cell">
        条件2：<dt-select v-model="params.key2" class="dt-search-select" url="deviceType"/>
      </div>
      <div class="dt-search-cell">
        条件3：<dt-selectUrl v-model="params.key3" class="dt-search-select" url="device/get_select"/>
      </div>
      <div class="dt-search-cell">
        条件4：<DatePicker type="date" placeholder="请选择时间" class="dt-search-date"></DatePicker>
      </div>
      <div class="dt-search-cell">
        <Button type="ghost" @click="handleSearch">查询</Button>
      </div>
      <div class="dt-search-operation">
        <Button type="error" @click="handleTableSelect">批量删除</Button>
        <Button type="info" @click="handleAdd">新增</Button>
      </div>
    </div>
    <dt-table ref="table" url="device/get_list" :params="params" :columns="columns"></dt-table>

    <dt-slidePage v-model="modal1" title="新增">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="条件1" prop="form1">
          <Input v-model="formData.form1" placeholder="请输入条件1"></Input>
        </FormItem>
        <FormItem label="条件2" prop="form2">
          <dt-select v-model="formData.form2" url="deviceType"/>
        </FormItem>
        <FormItem label="时间" prop="form3">
          <DatePicker type="date" placeholder="请选择时间" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="区域" prop="form4">
          <Row><al-selector v-model="formData.form4" level="2" auto gutter='0'/></Row>
        </FormItem>
        <FormItem label="详细地址" prop="form5">
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
          key3: ''
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
        modal1: false,
        formData: {
          form1: '',
          form2: '',
          form3: '',
        },
        rule: {
          form1: [],
          form2: [],
          form3: [],
        }
      }
    },
    mounted () {
    },
    methods: {
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
      },
      handleEdit(item){
        this.modal1 = true;
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
        let vArr = [
          [this.formData.form1, '姓名', 'empty|password'],
        ];
        this.$validate(vArr).then(valid => {
          console.log('11111',valid)
        });
        this.modal1 = false;
      },
    },
  };
</script>