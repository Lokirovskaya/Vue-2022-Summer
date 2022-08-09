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
  >

{{ node.label }} 
<!-- <el-button @click="show(node)">click</el-button> -->
&nbsp;
<i class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
<i class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
<i class="el-icon-folder-add" @click="start_create(data)"></i>
<!-- <el-button @click="handlebutton(data)">click</el-button> -->
      <!-- <span></span> -->
  </span>
</el-tree>


<el-dialog title="重命名" :visible.sync="rename_dialogVisible" width="40%">
      <div>
          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <el-input placeholder="输入文档名" v-model="input_file_name_rename" class="rename_input"></el-input>
        <!-- </el-form-item> -->

        <el-button @click="rename_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="rename_file()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="确认删除" :visible.sync="delete_dialogVisible" width="40%">
      <div>
          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <!-- <el-input v-model="input_file_name_rename" class="rename_input"></el-input> -->
        <!-- </el-form-item> -->

        <el-button @click="delete_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="delete_file()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建" :visible.sync="create_dialogVisible" width="40%">
      <div>
          <el-radio v-model="radio" label="1">新建文档</el-radio>
            <el-radio v-model="radio" label="2">新建文件夹</el-radio>
          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <el-input placeholder="输入文档名" v-model="input_file_name_create" class="create_input"></el-input>
        <!-- </el-form-item> -->

        <el-button @click="create_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="create_file()">确定</el-button>
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
        delete_dialogVisible:false,
        create_dialogVisible:false,

        input_file_name_rename:'',
        input_file_name_create:'',

        radio:'1',
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
        // console.log('tree drag enter: '+dropNode.id+' label:'+dropNode.label);
        console.log('currLevel:'+dropNode.currLevel);
      },
      handlebutton(dropNode) {
        console.log('BUTTON:tree drag enter: '+dropNode.id+' label:'+dropNode.label);
      },

    start_rename(file){
        console.log(file.id);
        this.rename_dialogVisible = true;
        this.input_file_name_rename = file.label;
    },

    rename_file(){
        this.rename_dialogVisible = false
    },

    start_delete(file){
        console.log(file.id);
        this.delete_dialogVisible = true;
    },

    delete_file(){
        this.delete_dialogVisible = false
    },

    start_create(file){
        console.log(file.id);
        this.create_dialogVisible = true;
    },
    
    create_file(){
        this.create_dialogVisible = false;
        console.log(this.input_file_name_create);
    },

    },

    
};
</script>

<style scoped>
.create_input{
    display: flex;
    margin: 20px;
    /* justify-content:center; */
    flex-direction:column;
    width: 500px;
}
.rename_input{
    display: flex;
    margin-bottom: 20px;
    /* flex-direction:column;
    justify-content: center;
    align-items: center; */
    width: 500px;
}
</style>