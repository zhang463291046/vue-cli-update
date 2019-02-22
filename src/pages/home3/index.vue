<template>
  <div class="page">
    <h1>自定义树</h1>
    <dt-ul :model="data" :can-edit="true" :isAddRoot="true" :open="true" @addRoot="addRoot" @addChild="addChild" @editModel="editModel" @deleteModel="deleteModel" style="width: 300px;"></dt-ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data:[
          {
            id: 1,
            label: '1',
            checked: false,
            children: [
              {
                id: 11,
                label: '1-1',
                checked: false,
              },
              {
                id: 12,
                label: '1-2',
                checked: false,
                children: [
                  {
                    id: 121,
                    label: '1-2-1',
                    checked: false,
                  },
                  {
                    id: 122,
                    label: '1-2-2',
                    checked: false,
                    isLastChild: true,
                  }
                ]
              }
            ]  
          },
          {
            id: 2,
            label: '2',
            checked: false,
            isLastChild: true
          },
        ]
      }
    },

    mounted () {

    },

    methods: {
      addRoot(val){
        console.log(val)
      },
      addChild(val){
        console.log(val)
      },
      editModel(val){
        console.log(val)
      },
      deleteModel(val){
        console.log(val)
      },
    },
  };
</script>