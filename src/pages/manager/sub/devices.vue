<template>
  <div>
    <div class="pd-20">
      <div class="single-bar">
        <div class="left">
          <dt-search placeholder="请输入设备名称查找" v-model="params.content" @onSearch="handleSearch"/>
        </div>
        <div class="right">
          <dt-button @click="handleAdd">添加设备</dt-button>
        </div>
      </div>
      <dt-table ref="table" :columns="columns" url="device/get_device_list" :params="params" methods="POST">
      </dt-table>
    </div>
    <Modal
      :title="detector.title"
      :loading="detector.loading"
      v-model="detector.visiable"
    >
      <div class="modal-wrap">
        <Form :label-width="100">
          <div class="modal-item" v-for="(item, index) in detector.data" :key="index">
            <div class="modal-item-left">
              <FormItem label="探测器通道类型">
                <dt-select v-model="item.type" :options="detector.options1" :transfer="true"></dt-select>
              </FormItem>
              <FormItem label="探测器通道">
                <dt-select v-model="item.channel" :options="detector.options2" :transfer="true"></dt-select>
              </FormItem>
            </div>
            <div class="modal-item-right">
              <Button type="error" shape="circle" icon="minus-round" @click="delMoreChannel(index)"></Button>
            </div>
          </div>

          <div class="modal-more">
            <Button type="primary" shape="circle" icon="plus-round" @click="addMoreChannel"></Button>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="detectorOk(false)">取消</Button>
        <Button type="primary" @click="detectorOk(true)" >确定</Button>
      </div>
    </Modal>
    <!--  阀值编辑 -->
    <Modal
      :title="threshold.title"
      v-model="threshold.visiable"
    >
      <div class="modal-wrap short">
        <Form :label-width="100">
          <div class="modal-item">
            <FormItem label="温度条件">
              <dt-select v-model="threshold.temp_type" :options="threshold.options" :transfer="true"></dt-select>
            </FormItem>
            <FormItem label="报警值">
              <InputNumber v-model="threshold.temp" placeholder="请输入温度报警阀值"/>
            </FormItem>
          </div>
          <div class="modal-item">
            <FormItem label="湿度条件">
              <dt-select v-model="threshold.hum_type" :options="threshold.options" :transfer="true"></dt-select>
            </FormItem>
            <FormItem label="报警值">
              <InputNumber v-model="threshold.hum" placeholder="请输入湿度报警阀值"/>
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="thresholdOk(false)">取消</Button>
        <Button type="primary" @click="thresholdOk(true)" >确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import dao from '../dao';
  import { setSessionStorage } from '../../../common/utils';
  import { typeDict } from '../../configs';

  export default {
    data () {
      return {
        columns: [
          {title: '设备类型', key: 'type', render: (h, params) => {
            const type = params.row.type;
            const dict = typeDict[type];
            return (
              <div>
                {dict}
              </div>
            )
          }},
          {title: '所属DTU', key: 'dtu_num', width: '100px'},
          {title: '主机地址', key: 'mac'},
          {title: '设备名称', key: 'name'},
          {title: '设备地址', key: 'addr'},
          {title: '主机通道号', key: 'master_num'},
          {title: '操作',
            key: 'active',
            align: 'center',
            width: '180px',
            render: (h, params) => {
              const type = params.row.type;
              const showEdit = ['1', '2', '4'].indexOf(type) !== -1;
              return (
                <div class="txtr">
                {showEdit && <dt-button class="mr15" on-click={this.handleEdit.bind(this, params.row)} shape="circle" icon={false} size="mini" ghost>设置</dt-button>}
                  <i-poptip confirm transfer title="您确认删除这该设备吗？" on-on-ok={this.handleDel.bind(this, params.row)}>
                    <dt-button shape="circle" icon={false} type="error" size="mini" ghost>删除</dt-button>
                  </i-poptip>
                </div>
              );
            }
          }
        ],
        params: {
          content: ''
        },
        detector: {
          id: '',
          visiable: false,
          title: '',
          loading: true,
          options1: [
            { label: '漏电流', value: '3' },
            { label: '温度', value: '4' }
          ],
          options2: [
            { label: '通道1', value: '1' }, 
            { label: '通道2', value: '2' }, 
            { label: '通道3', value: '3' }, 
            { label: '通道4', value: '4' },
            { label: '通道5', value: '5' }, 
            { label: '通道6', value: '6' }, 
            { label: '通道7', value: '7' }, 
            { label: '通道8', value: '8' },
            { label: '通道9', value: '9' }, 
            { label: '通道10', value: '10' }, 
            { label: '通道11', value: '14' }, 
            { label: '通道12', value: '12' },
            { label: '通道13', value: '13' }, 
            { label: '通道14', value: '14' }, 
            { label: '通道15', value: '15' }, 
            { label: '通道16', value: '16' }
          ],
          data: []
        },
        threshold: {
          id: '',
          visiable: false,
          title: '',
          options: [
            { label: '大于', value: '1' },
            { label: '小于', value: '2' },
            { label: '大于等于', value: '3' },
            { label: '小于等于', value: '4' }
          ],
          temp_type: '1',
          temp: 0,
          hum_type: '1',
          hum: 0
        }
      };
    },

    methods: {
      async handleDel(row) {
        const rs = await dao.del_devicel(row.id);
        if (rs) {
          this.$refs.table.refresh();
        }
      },
      handleAdd() {
        setSessionStorage('currName', 'devices');
        this.$router.$push({ name: 'editDevice'});
      },
      handleSearch() {
        this.params = Object.assign({}, this.params);
      },
      handleEdit(row) {
        //管道设置type为1,2
        if (row.type === '1' || row.type === '2') {
          this.editChannel(row);
        } else {
          this.editThreshold(row);
        }
      },

      async editChannel(row) {
        // 编辑通道
        const id = row.id
        const name  =  row.name;
        this.detector.title = name;
        // this.detector.title = name;
        this.detector.id = id;
        this.detector.data = [{ channel: '', type: '' }];
        this.detector.visiable = true;
        const data = await dao.channel_info(id);
        if (data) {
          this.detector.data = data;
        }
      },

      editThreshold(row) {
        // 编辑阀值
        let propertyValue = row.property_value;
        const id = row.id;
        const name  =  row.name;
        this.threshold.title = name;
        if (propertyValue !== '') {
          try {
            propertyValue = JSON.parse(propertyValue);
          } catch (e) {
            console.warn('设备阀值格式转换失败:', e);
          }
        }

        if (!propertyValue) {
          propertyValue = { temp_type: '1', temp: 0, hum_type: '1', hum: 0 }
        }
        const { temp_type, temp, hum_type, hum } = propertyValue;
        this.threshold.visiable = true;
        this.threshold.id = id;
        this.threshold.temp_type = temp_type;
        this.threshold.temp = Number(temp);
        this.threshold.hum_type = hum_type;
        this.threshold.hum = Number(hum);
      },

      addMoreChannel() {
        this.detector.data.push({ channel: '', type: '' });
      },
      delMoreChannel(index) {
        if (this.detector.data.length > 0) {
          this.detector.data.splice(index, 1);
        }
      },
      async detectorOk(flag) {
        if (!flag) {
          this.detector.visiable = false;
          return;
        }
        const { data, id } = this.detector;
        console.info(data);
        let isError = false;
        let errorMsg = '';
        const channelArr = [];
        data.length > 0 && data.some((item, index) => {
          const { channel, type } = item;
          if (channel === '' || type === '') {
            isError = true;
            errorMsg = '请勾选完整！'
          }
          const last = channelArr.indexOf(channel);
          if (last !== -1) {
            isError = true;
            errorMsg = `第${last + 1}组和${index + 1}通道号重复，请重新选择！`;
          }
          channelArr.push(channel);
          return isError;
        });

        if (isError) {
          this.$Message.warning(errorMsg);
          return false;
        }

        const channelStr = JSON.stringify(data);;
        const rs = await dao.edit_channel_info(id, channelStr);
        if (rs) {
          this.detector.visiable = false;
          this.$refs.table.refresh();
        }
      },
      async thresholdOk(flag) {
        if (!flag) {
          this.threshold.visiable = false;
          return;
        }
        const { id, temp_type, temp, hum_type, hum } = this.threshold;
        const rs = await dao.add_threshold(id, temp_type, temp, hum_type, hum);
        if (rs) {
          this.threshold.visiable = false;
          this.$refs.table.refresh();
        }
      }
    }
  };
</script>

<style lang="less">
  .modal-wrap{
    max-height: 600px;
    overflow-y: auto;
  }

  .short{
    .ivu-form-item-content{
      width: 78px;
    }
  }
  .modal-item{
    padding-bottom: 15px;
    display: flex;

    .modal-item-left{
      flex:1;
    }
    .modal-item-right{
      display: flex;
      width: 50px;
      justify-content: center;
      align-items: center;
    }
    .ivu-form-item{
      margin-bottom: 5px !important;
    }
  }
  .modal-more{
    text-align: right;
  }
</style>
