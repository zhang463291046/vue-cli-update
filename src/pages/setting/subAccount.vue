<template>
    <div class="panel-content">
      <div class="single-bar">
        <div class="left">
          <dt-input-search v-model="params.content" placeholder="用户名/账号/手机号" @onSearch="handleSearch"/>
        </div>
        <div class="right">
          <Button type="primary" icon="plus" @click="add">添加维修方法</Button>
        </div>
      </div>
      <dt-table :columns="columns" url="Mydevice/get_list" methods="post" :params="params"></dt-table>
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
  export default {
    data () {
      return {
        model1: false,
        formItem: {
          input:'',
          input2:''
        },
        params: {
          type:'1',
          content: '',
          model1:'1',
          model2:'1',
          model3:'1',
          time1:'',
          time2:'',
        },
        columns: [
          { title: '头像', key: 'key1' },
          { title: '姓名', key: 'key2' },
          { title: '性别', key: 'key3' },
          { title: '账号', key: 'key4' },
          { title: '手机号', key: 'key5' },
          { title: '角色类型', key: 'key6' },
          { title: '操作', key: 'key7' }
        ],
      }
    },

    methods: {
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
      add() {
        this.model1 = true;
      }
    },

  };
</script>

