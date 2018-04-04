<template>
    <div class="panel-content">
      <div class="single-bar">
        <div class="left">
           <Button type="primary" icon="plus" @click="add">添加维修方法</Button>
        </div>
        <div class="right"></div>
      </div>
      <dt-card-list :columns="columns" url="Mydevice/get_list" methods="post" :params="params"></dt-card-list>
      <slide-page v-model="model1" title="新增">
        <Form :model="formItem" :label-width="80">
          <FormItem label="信息标题">
            <Input v-model="formItem.input" placeholder="输入信息标题"></Input>
          </FormItem>
          <FormItem label="信息内容">
            <Input v-model="formItem.input2" type="textarea" :rows="10" placeholder="输入信息内容"></Input>
          </FormItem>
          <FormItem label="选择文件">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
          </FormItem>
        </Form>
      </slide-page>
    </div>
</template>
<script>
  import { statusDict } from '../configs';

  export default {
    data () {
      return {
        model1: false,
        formItem: {
          input:'',
          input2:''
        },
        columns: [
          { title: '设备名称', key: 'name' },
          { title: '设备地址', key: 'address' },
          { title: '责任人', key: 'person_str' },
          { title: '状态',
            key: 'on_line',
            render: (h, params) => {
              const label = statusDict[params.row.on_line];
              return (
                <div>
                  {label}
                </div>
              )
            }
          }
        ],
        params: {
          type: '2',
          content: ''
        }
      };
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
      add() {
        this.model1 = true;
      }
    },

    components: {
    }
  };
</script>

