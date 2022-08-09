<template>
    <div>
        文档中心


        <el-tree
  :data="doc_data"
  node-key="id"
  :props="defaultProps"
  @node-click="handleclick"
  >
  <span
  slot-scope="{ node , data}"
  @mouseenter="mouseenter(data)"
                @mouseleave="mouseleave(data)"
  
  >
{{ node.label }} 
<!-- <el-button @click="show(node)">click</el-button> -->
<i class="el-icon-edit" @click="open_edit(data)"></i>
<!-- <el-button @click="handlebutton(data)">click</el-button> -->
      <!-- <span></span> -->
  </span>
</el-tree>


<el-dialog title="重命名" :visible.sync="rename_dialogVisible" width="40%">
      <div>
          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <el-input v-model="input_file_name" class="rename_input"></el-input>
        <!-- </el-form-item> -->

        <el-button @click="edit_proj_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="edit_proj()">确定</el-button>
      </div>
    </el-dialog>


    </div>
    
</template>

<script>
// import qs from 'qs';
export default {
  name: 'HomeView',

  data() {
    return {
      doc_data: [{
          id: 1,
          label: '项目1',
          children: [{
            id: 4,
            label: '文档1-1',
          }]
        }, {
          id: 2,
          label: '项目2',
          children: [{
            id: 5,
            label: '文档2-1'
          }, {
            id: 6,
            label: '文档2-2'
          }]
        }, {
          id: 3,
          label: '项目3',
          children: [{
            id: 7,
            label: '文档3-1'
          }, {
            id: 8,
            label: '文档3-2',
          }]
        },
        // {
        //   id: 1,
        //   label: '项目4',
        // }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        rename_dialogVisible:false,
        add_dialogVisible:false,

        input_file_name:'',
    };
  },

  methods: {

      treeNodeClick(node){
          console.log('node_id:'+node.id+' node_lable:'+node.label);
      },
      show(node){
          alert('node_id:'+node.id+' node_lable:'+node.label);
      },
      handleclick(dropNode) {
        console.log('tree drag enter: '+dropNode.id+' label:'+dropNode.label);
      },
      handlebutton(dropNode) {
        console.log('BUTTON:tree drag enter: '+dropNode.id+' label:'+dropNode.label);
      },

          mouseenter(data) {
      this.$set(data, "show", true);
    },
    mouseleave(data) {
      this.$set(data, "show", false);
    },

    open_edit(file){
        console.log(file.id);
        this.rename_dialogVisible = true;
        this.input_file_name = file.label;
    },


    // create_folder(folder_name){

    // },

    rename_folder(){
        
    }


    },

    
};
</script>

<style scoped>
.rename_input{
    display: flex;

}
</style>