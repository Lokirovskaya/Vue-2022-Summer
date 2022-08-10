<template>
    <div>
        文档中心
        <!-- <i class="el-icon-folder-add" @click="start_create_atroot()"></i> -->

        <el-tree
  :data="doc_data"
  node-key="id"
  :props="props1"
  @node-click="handleclick"
  >
  <span
  slot-scope="{ node , data}"
  >

<span v-if="data.file_flag === 0" @click="into_file(data.file_id,data.file_name)">{{ node.label }} </span>
<span v-else>{{ node.label }} </span>
<!-- <el-button @click="show(node)">click</el-button> -->
&nbsp;
<i class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
<i class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
<i class="el-icon-copy-document" @click="start_copy(data)"></i>&nbsp;
<i v-if="data.file_flag === 1" class="el-icon-folder-add" @click="start_create(data)"></i>
  </span>
</el-tree>

<el-tree
  :data="doc_data_of_projs"
  node-key="id"
  :props="props2"
  @node-click="handleclick1"
  >
  <span
  slot-scope="{ node , data}"
  >

<a @click="into_file(data.fileId,data.fileName)">{{ node.label }} </a>
<!-- {{ node.label }}  -->
<!-- <el-button @click="show(node)">click</el-button> -->
&nbsp;
<i class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
<i class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
<!-- <i v-if="data.file_flag === 1" class="el-icon-folder-add" @click="start_create(data)"></i> -->
<i class="el-icon-folder-add" @click="start_create(data)"></i>
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

    <el-dialog title="确认复制" :visible.sync="copy_dialogVisible" width="40%">
      <div>
          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <!-- <el-input v-model="input_file_name_rename" class="rename_input"></el-input> -->
        <!-- </el-form-item> -->

        <el-button @click="copy_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="copy_file()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建" :visible.sync="create_dialogVisible" width="40%">
      <div>
          <div class="choose_type">
          <el-radio v-model="choose_radio" label="1">新建文档</el-radio>
            <el-radio v-model="choose_radio" label="2">新建文件夹</el-radio>
          </div>

            <div v-if="this.choose_radio === '1'" class="choose_model">
            <el-radio v-model="choose_model" label="1">会议纪要模板</el-radio>
            <el-radio v-model="choose_model" label="2">架构设计说明书模板</el-radio>
            <el-radio v-model="choose_model" label="3">需求规格说明书模板</el-radio>
            <el-radio v-model="choose_model" label="4">项目管理看板</el-radio>
            <el-radio v-model="choose_model" label="5">项目计划书模板</el-radio>
            <el-radio v-model="choose_model" label="6">项目周报模板</el-radio>
            <el-radio v-model="choose_model" label="7">需求调研报告模板</el-radio>
            </div>

          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <el-input placeholder="输入文档名" v-model="input_file_name_create" class="create_input"></el-input>
        <!-- </el-form-item> -->

        <el-button @click="create_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="create_file()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建" :visible.sync="create_atroot_dialogVisible" width="40%">
      <div>
          <div class="choose_type">
          <el-radio v-model="choose_radio" label="1">新建文档</el-radio>
            <el-radio v-model="choose_radio" label="2">新建文件夹</el-radio>
          </div>

            <div v-if="this.choose_radio === '1'" class="choose_model">
            <el-radio v-model="choose_model" label="1">会议纪要模板</el-radio>
            <el-radio v-model="choose_model" label="2">架构设计说明书模板</el-radio>
            <el-radio v-model="choose_model" label="3">需求规格说明书模板</el-radio>
            <el-radio v-model="choose_model" label="4">项目管理看板</el-radio>
            <el-radio v-model="choose_model" label="5">项目计划书模板</el-radio>
            <el-radio v-model="choose_model" label="6">项目周报模板</el-radio>
            <el-radio v-model="choose_model" label="7">需求调研报告模板</el-radio>
            </div>

          <!-- <el-form-item label="项目名称" :label-width="500" required> -->
          <el-input placeholder="输入文档名" v-model="input_file_name_create" class="create_input"></el-input>
        <!-- </el-form-item> -->

        <el-button @click="create_atroot_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="create_file_atroot()">确定</el-button>
      </div>
    </el-dialog>


    </div>
    
</template>

<script>
import qs from 'qs';
export default {
  name: 'HomeView',

  data() {
    return {

    doc_data:[
        {
            file_id:0,
            file_name:'文档中心',
            file_flag:1, //0:test为文件 1:test为文件夹
            last_edit_time:undefined,
            file_list:[],
        }
    ],

    doc_data_of_projs_fromserver:[],
    doc_data_of_projs:[
        {
            fileId:0,
            fileName:'项目文档区',
            file_flag:1, //0:test为文件 1:test为文件夹
            last_edit_time:undefined,
            files_data:[],
        }
    ],
    tmp:[], //存某个项目所有的文档信息

    
        props1: {
          children: 'file_list',
          label: 'file_name',
        },

        props2: {
        children: 'files_data',
          label: 'fileName',
        },



        // data_from_server:[],

        rename_dialogVisible:false,
        delete_dialogVisible:false,
        copy_dialogVisible:false,
        create_dialogVisible:false,
        create_atroot_dialogVisible:false,

        input_file_name_rename:'',
        input_file_name_create:'',

        choose_radio:'1', //1:文件 2:文件夹
        choose_model:'0',

        team_id:this.$route.query.id,

        file_now:[],
    };
  },

  methods: {

      get_now_time() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return time;
      },

      treeNodeClick(node){
          console.log('node_id:'+node.id+' node_lable:'+node.label);
      },
    //   show(node){
    //       alert('node_id:'+node.id+' node_lable:'+node.label);
    //   },
      handleclick(dropNode) {
        // console.log('tree drag enter: '+dropNode.id+' label:'+dropNode.label);
        // console.log('currLevel:'+dropNode.currLevel);
        console.log('id:'+dropNode.file_id);
      },
      handleclick1(dropNode) {
          console.log('id:'+dropNode.fileId);
      },

    start_rename(file){
        console.log(file.file_id);
        this.rename_dialogVisible = true;
        this.input_file_name_rename = file.file_name;
        this.file_now = file;
    },

    // start_rename_projfile(file){
    //     console.log(file.fileId);
    //     this.rename_dialogVisible = true;
    //     this.input_file_name_rename = file.fileName;
    //     this.file_now = file;
    // },

    rename_file(){
        this.rename_dialogVisible = false;

        if (this.file_now.file_flag === 0) //重命名文件
        {
            console.log('重命名文件');
            let rename_file_ifo = {
            proj_id:'',
            file_id:this.file_now.file_id,
            file_name:this.input_file_name_rename,
            teamid:this.team_id,
            modify_time:this.get_now_time(),
        }
        console.log(rename_file_ifo)
        this.$axios
  .post('project/renameFile', qs.stringify(rename_file_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        else{
            console.log('重命名文件夹')
            let rename_folder_ifo = {
                folder_id:this.file_now.file_id,
                folder_name:this.input_file_name_rename,
                edit_time:this.get_now_time(),
            }
            console.log(rename_folder_ifo);
            this.$axios
  .post('team/renameFolder', qs.stringify(rename_folder_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
    },

    

    start_delete(file){
        console.log(file.file_id);
        this.delete_dialogVisible = true;
        this.file_now = file;
    },

    delete_file(){
        this.delete_dialogVisible = false
        if (this.file_now.file_flag === 0) //删除文件
        {
            console.log('删除文件');
            let delete_file_ifo = {
                file_id:this.file_now.file_id,
            }
            console.log(delete_file_ifo);
            this.$axios
  .post('project/deleteFile', qs.stringify(delete_file_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        else //删除文件夹
        {
            console.log('删除文件夹');
            let delete_folder_ifo = {
                folder_id:this.file_now.file_id,
            }
            console.log(delete_folder_ifo);
            this.$axios
  .post('team/deleteFolder', qs.stringify(delete_folder_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
    },

    start_copy(file){
        console.log(file.file_id);
        this.copy_dialogVisible = true;
        this.file_now = file;
    },

    copy_file() {
        this.copy_dialogVisible = false;
        if (this.file_now.file_flag === 0) //删除文件
        {
            console.log('复制文件');
            let copy_file_ifo = {
                file_id:this.file_now.file_id,
                to_folder_id:this.file_now.parent_folder_id, //to modify
                edit_time:this.get_now_time(),
            }
            console.log(copy_file_ifo);
            this.$axios
  .post('team/copyTeamFile', qs.stringify(copy_file_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        else //复制文件夹
        {
            console.log('复制文件夹');
            let copy_folder_ifo = {
                folder_id:this.file_now.file_id,
                to_folder_id:this.file_now.parent_folder_id, //to modify
                edit_time:this.get_now_time(),
            }
            console.log(copy_folder_ifo);
            this.$axios
  .post('team/copyFolder', qs.stringify(copy_folder_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
    },


    start_create(file){
        console.log(file.file_id);
        this.create_dialogVisible = true;
        this.input_file_name_create = '';
        this.file_now = file;
    },
    
    create_file(){
        this.create_dialogVisible = false;
        console.log(this.input_file_name_create);
        if (this.choose_radio === '2') //创建文件夹
        {
            console.log('创建文件夹');
            let create_folder = {
            team_id:this.team_id,
            is_root:2,
            folder_name:this.input_file_name_create,
            father_id:this.file_now.file_id,
            create_time:this.get_now_time(),
        }
        console.log(create_folder);
        this.$axios
  .post('team/createFolder', qs.stringify(create_folder), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        else { //创建文件
        console.log('创建文件');
        let create_file = {
            file_name:this.input_file_name_create,
            create_time:this.get_now_time(),
            // proj_id:'10',
            teamid:this.team_id,
            judge:1,
            folder_id:this.file_now.file_id,
            model:this.choose_model,

        }
        console.log(create_file),
        this.$axios
  .post('project/createFile', qs.stringify(create_file), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
    },

    start_create_atroot(){
        this.create_atroot_dialogVisible = true;
        this.input_file_name_create = '';
    },

    create_file_atroot(){
        this.create_atroot_dialogVisible = false;
        console.log(this.choose_radio);
        if (this.choose_radio === '2') //创建文件夹
        {
            console.log('创建文件夹');
            let create_folder_atroot = {
            team_id:this.team_id,
            // team_id:11,
            is_root:1,
            folder_name:this.input_file_name_create,
            father_id:0,
            create_time:this.get_now_time(),
        }
        console.log(create_folder_atroot);
        this.$axios
  .post('team/createFolder', qs.stringify(create_folder_atroot), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        else { //创建文件
        console.log('创建文件');
        let create_file_atroot = {
            file_name:this.input_file_name_create,
            create_time:this.get_now_time(),
            // proj_id:'10',
            teamid:this.team_id,
            judge:1,
            folder_id:0,
            model:this.choose_model,

        }
        console.log(create_file_atroot),
        this.$axios
  .post('project/createFile', qs.stringify(create_file_atroot), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
    } else {
      this.$message.error(res.data.msg);
    }
    this.refresh();
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
        
    },

    get_file_info(){
        let init_ifo = {
            teamid:this.team_id,
        }
        this.$axios
  .post('team/file_center', qs.stringify(init_ifo), {
    headers: {
      userid: this.$store.state.userid,
      token: this.$store.state.token,
    },
  })
  .then((res) => {
    if (res.data.errno === 0) {
    //   this.$message.success('...');
    this.doc_data[0].file_list = res.data.team_data;
    this.doc_data_of_projs_fromserver = res.data.project_data;
    this.handle_doc_data_of_projs(this.doc_data_of_projs_fromserver);
    } else {
      this.$message.error(res.data.msg);
    }
  })
  .catch((err) => {
    this.$message.error(err);
  });
    },

    handle_doc_data_of_projs(data){ //处理项目文档区数据
        for (var i = 0; i < data.length; i++) //遍历项目
        {
            data = JSON.parse(JSON.stringify(data).replace(/projectId/g,'fileId'));
            data = JSON.parse(JSON.stringify(data).replace(/projName/g,'fileName'));
        }
        
        this.doc_data_of_projs[0].files_data = data;
       console.log(this.doc_data_of_projs);
    },

     into_file(file_id, file_name) {
      console.log(file_id);
      this.$router.push({ path: '/fileedit', query: { id: file_id, name: file_name } });
    },

    refresh() {
      this.$router.go(0);
    },

    },

    created() {
      this.get_file_info();
      // console.log(this.get_now_time());
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
    /* width: 500px; */
}

.choose_model{
  display: flex;
  margin: 10px;
  width: 500px;
  flex-wrap:wrap;
}

.choose_type{
  display: flex;
  margin: 10px;
  /* padding: 10px; */
}


</style>