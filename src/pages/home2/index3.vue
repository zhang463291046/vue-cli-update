<template>
  <div class="page">
    <Row :gutter="10">
        <Col span="17">
            <Card>
                <p slot="title"><Icon type="minus-round"></Icon>基础示例</p>
                <Row class="area-linkage-page-row1">
                    <al-selector 
                        v-model="resDefault"
                        level="3"
                        auto
                    />
                    <pre>&lt;al-selector v-model="resDefault" /&gt;</pre>
                    <al-cascader
                        v-model="res1"
                        style="margin-top:20px;width:50%;"
                    />
                    <pre>&lt;al-cascader v-model="res1" /&gt;</pre>
                    <Button @click="setAreaOne">set city</Button>
                    <Button @click="setAreaTwo">set city</Button>
                    <Button @click="setAreaThree">set city</Button>
                    <div><p>更多配置可参考iview-area组件官方文档：<a href="https://github.com/iview/iview-area" target="_block">iview-area</a></p></div>
                </Row>
            </Card>
        </Col>
        <Col span="7">
            <Card>
                <p slot="title"><Icon type="stats-bars"></Icon>数据展示</p>
                <Row class="area-linkage-page-row1">
                    <pre style="font-size:12px;">{{ showRes }}</pre>
                </Row>
            </Card>
        </Col>
    </Row>
    <Row class="margin-top-10" :gutter="10">
        <Col span="3">
            <Card>
                <p slot="title">一级</p>
                <al-selector v-model="res1" level="0"/>
            </Card>
        </Col>
        <Col span="5">
            <Card>
                <p slot="title">二级</p>
                <al-selector v-model="res1" level="1"/>
            </Card>
        </Col>
        <Col span="7">
            <Card>
                <p slot="title">三级</p>
                <al-selector v-model="res1" data-type="code" level="2"/>
            </Card>
        </Col>
        <Col span="9">
            <Card>
                <p slot="title">四级</p>
                <al-selector v-model="res1" data-type="name" level="3"/>
            </Card>
        </Col>
    </Row>
    <Row class="margin-top-10" :gutter="10">
        <Col span="8">
            <Card>
                <p slot="title">禁用指定级别</p>
                <al-selector v-model="res1" :disabled="2" level="3"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">四级</p>
                <al-cascader v-model="res1" level="3"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">三级</p>
                <al-cascader v-model="res1" level="2"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">二级</p>
                <al-cascader v-model="res1" data-type="name" level="1"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">一级</p>
                <al-cascader v-model="res1" data-type="code" level="0"/>
            </Card>
        </Col>
    </Row>
    <Row class="margin-top-10" :gutter="10">
        <Col span="4">
            <Card>
                <p slot="title">三种尺寸</p>
                <al-selector v-model="res1" size="large" level="0"/>
                <al-selector style="margin-top:10px;" v-model="res1" size="default" level="0"/>
                <al-selector style="margin-top:10px;" v-model="res1" size="small" level="0"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">三种尺寸</p>
                <al-cascader v-model="res1" size="large" level="1"/>
                <al-cascader style="margin-top:10px;" v-model="res1" level="1"/>
                <al-cascader style="margin-top:10px;" v-model="res1" size="small" level="1"/>
            </Card>
        </Col>
        <Col span="4">
            <Card>
                <p slot="title">自定义显示格式</p>
                <Row class="area-linkage-page-row2">
                    <al-cascader
                        v-model="res1" 
                        size="large" 
                        level="3"
                        placeholder="这是级联模式"
                        :render-format="renderFormat"/>
                </Row>
            </Card>
        </Col>
        <Col span="12">
            <Card>
                <p slot="title">可搜索</p>
                <Row class="area-linkage-page-row2">
                    <al-selector 
                        :value="res1"
                        searchable
                    />
                </Row>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
    components: {
        
    },
    data () {
        return {
            res1: [],
            resDefault: ['河北省', '张家口市', '怀来县', '沙城镇'],
            showRes: []
        };
    },
    methods: {
        renderFormat (label) {
            return label.join(' => ');
        },
        setAreaOne () {
            this.resDefault = ['北京市', '市辖区', '东城区', '东华门街道'];
        },
        setAreaTwo () {
            this.resDefault = ['山西省', '太原市', '小店区', '北营街道'];
        },
        setAreaThree () {
            this.resDefault = ['130000', '130700', '130730', '130730100000'];
        }
    },
    watch: {
        res1 (val) {
            this.showRes = val;
        },
        resDefault (val) {
            this.showRes = val;
        }
    }
};
</script>

<style lang="less" scoped>
.area-linkage-page{
  &-row1{
      height: 366px !important;
  }
  &-row2{
      height: 112px !important;
  }
}
.margin-top-8{
    margin-top: 8px;
}
.margin-top-10{
    margin-top: 10px;
}
.margin-top-20{
    margin-top: 20px;
}
.margin-left-10{
    margin-left: 10px;
}
.margin-bottom-10{
    margin-bottom: 10px;
}
.margin-bottom-100{
    margin-bottom: 100px;
}
.margin-right-10{
    margin-right: 10px;
}
.padding-left-6{
    padding-left: 6px;
}
.padding-left-8{
    padding-left: 5px;
}
.padding-left-10{
    padding-left: 10px;
}
.padding-left-20{
    padding-left: 20px;
}
.height-100{
    height: 100%;
}
.height-120px{
    height: 100px;
}
.height-200px{
    height: 200px;
}
.height-492px{
    height: 492px;
}
.height-460px{
    height: 460px;
}
.line-gray{
    height: 0;
    border-bottom: 2px solid #dcdcdc;
}
.notwrap{
    word-break:keep-all; 
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.padding-left-5{
    padding-left: 10px;
}
[v-cloak]{
    display: none;
}
</style>
