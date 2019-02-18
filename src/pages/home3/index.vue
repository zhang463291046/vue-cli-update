<template>
  <div class="page">
    <h1>待研发中......</h1>
    <dt-ul :model="data" style="width: 300px;"></dt-ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data:[
          {
            isParent: true,
            id: 1,
            label: '1',
            checked: false,
            isLastChild: false,
            children: [
              {
                isParent: true,
                id: 1,
                label: '1',
                checked: false,
                isLastChild: false,
              },
              {
                isParent: true,
                id: 2,
                label: '1',
                checked: false,
                isLastChild: false,
              }
            ]  
          },
          {
            isParent: true,
            id: 2,
            label: '2',
            checked: false,
            isLastChild: false
          },
        ]
      }
    },

    mounted () {

    },

    methods: {
    
    },
  };
</script>