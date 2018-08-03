<template>
  <Tree v-bind="$attrs" v-on="$listeners" :render="renderContent"></Tree>
</template>

<script>
  export default {
    data () {
      return {
       
      }
    },
    mounted () {
     
    },
    methods: {
      renderContent (h, { root, node, data }) {
          return h('span', {
            style: {
              height: '30px',
              display: 'inline-block',
              width: '100%'
            },
            on: {
              mouseenter: (e) => {
                e.target.lastChild.style.display = 'inline-block';
              },
              mouseleave: (e) => {
                e.target.lastChild.style.display = 'none';
              },
            }
          }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'document-text'
                  },
                  style: {
                    marginRight: '10px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'none',
                  float:'right',
                  marginRight: '30px'
                }
              }, [
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small',
                      icon: 'plus'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => { 
                        this.append(data) 
                      }
                    }
                  }),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => { 
                        this.edit(root, node, data) 
                      }
                    }
                  }),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small',
                      icon: 'minus'
                    },
                    on: {
                      click: () => { 
                        this.remove(root, node, data) 
                      }
                    }
                  })
              ])
          ]);
      },
      append (data) {
        const children = data.children || [];
        children.push({
            title: 'appended node',
            expand: true
        });
        this.$set(data, 'children', children);
        this.$emit('handleAdd',data);
      },
      edit(root, node, data){
        this.$emit('handleEdit',data);
      },
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
        this.$emit('handleDelete',data);
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>
