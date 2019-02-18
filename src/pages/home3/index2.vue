<template>
  <div class="page">
    <h1>树型扩展</h1>
    <dt-tree :data="data" @handleAdd="handleAdd" @handleEdit="handleEdit" @handleDelete="handleDelete" style="width: 400px;"/>
    您点击了treeNode{{nodeData}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'child 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-1-2',
                    expand: true
                  }
                ]
              },
              {
                title: 'child 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  }
                ]
              }
            ]
          }
        ],
        nodeData: ''
      }
    },
    methods: {
      handleAdd(val){
        this.nodeData = val;
      },
      handleEdit(val){
        this.nodeData = val;
      },
      handleDelete(val){
        this.nodeData = val;
      },
    }
  }
</script>
