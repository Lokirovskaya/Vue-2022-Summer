<template>
  <div style="display: flex; height: 550px;">
    <div style="overflow-y: auto; height: 100%; overflow-x: hidden;">
    <el-tree :default-expand-all="true" :data="doc_data.concat(doc_data_of_projs)" node-key="id" :props="props1" @node-click="handleclick" class="tree">
      <span slot-scope="{ node, data }">
        <span
          v-if="data.file_flag === 0"
          @click="into_file(data.file_id, data.file_name, data.type_flag)"
          class="files_label el-icon-document"
          >&nbsp;{{ node.label }}&nbsp;&nbsp;

        </span>
        <span v-else class="folders_label el-icon-folder">&nbsp;{{ node.label }}&nbsp;&nbsp;</span>
        <!-- <span v-else class="folders_label el-icon-folder">{{ node.label }}&nbsp;&nbsp;</span> -->
        <i v-if="data.file_id !== 0 && data.type_flag !== 0 || data.type_flag === 0 && data.file_flag === 0" class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
        <i v-if="data.file_id !== 0 && data.type_flag !== 0 || data.type_flag === 0 && data.file_flag === 0" class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
        <i v-if="data.file_id !== 0 && data.type_flag !== 0 || data.type_flag === 0 && data.file_flag === 0" class="el-icon-copy-document" @click="start_copy(data)"></i>&nbsp;
        <i v-if="(data.type_flag === 1 && data.file_flag === 1) || (data.type_flag === 0 && data.file_id !== 0 && data.file_flag === 1)" class="el-icon-folder-add" @click="start_create(data)"></i>

        <!-- <i v-if="data.file_flag === 0" class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
        <i v-if="data.file_flag === 0" class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
        <i v-if="data.file_flag === 0" class="el-icon-copy-document" @click="start_copy(data)"></i>&nbsp;
        <i
          v-if="!(data.file_flag === 0) && data.file_id != 0"
          class="el-icon-folder-add"
          @click="start_create(data)"
        ></i> -->
      </span>
    </el-tree>
    </div>

    <!-- <el-tree :data="doc_data_of_projs" node-key="id" :props="props2" @node-click="handleclick" class="tree">
      <span slot-scope="{ node, data }">
        <span
          v-if="data.file_flag === 0"
          @click="into_file(data.file_id, data.file_name, data.type_flag)"
          class="files_label"
          >{{ node.label }}
        </span>
        <span v-else class="folders_label">{{ node.label }} </span>
        <i v-if="data.file_flag === 0" class="el-icon-edit" @click="start_rename(data)"></i>&nbsp;
        <i v-if="data.file_flag === 0" class="el-icon-delete" @click="start_delete(data)"></i>&nbsp;
        <i v-if="data.file_flag === 0" class="el-icon-copy-document" @click="start_copy(data)"></i>&nbsp;
        <i
          v-if="!(data.file_flag === 0) && data.file_id != 0"
          class="el-icon-folder-add"
          @click="start_create(data)"
        ></i>
      </span>
    </el-tree> -->
    <div style="display: inline-block; width: 95%">
     <EditView :file_id="file_id_toshow" :file_name="file_name_toshow" :team_id="team_id" :key="file_id_toshow"></EditView>
    </div>

    <el-dialog title="?????????" :visible.sync="rename_dialogVisible" width="40%">
      <div>
        <!-- <el-form-item label="????????????" :label-width="500" required> -->
        <el-input
          placeholder="???????????????????????????15?????????"
          v-model="input_file_name_rename"
          class="rename_input"
          maxlength="15"
          show-word-limit
        ></el-input>
        <!-- </el-form-item> -->

        <el-button @click="rename_dialogVisible = false">??????</el-button>
        <el-button type="primary" @click="rename_file()">??????</el-button>
      </div>
    </el-dialog>

    <el-dialog title="????????????" :visible.sync="delete_dialogVisible" width="40%">
      <div>
        <!-- <el-form-item label="????????????" :label-width="500" required> -->
        <!-- <el-input v-model="input_file_name_rename" class="rename_input"></el-input> -->
        <!-- </el-form-item> -->

        <el-button @click="delete_dialogVisible = false">??????</el-button>
        <el-button type="primary" @click="delete_file()">??????</el-button>
      </div>
    </el-dialog>

    <el-dialog title="????????????" :visible.sync="copy_dialogVisible" width="40%">
      <div>
        <!-- <el-form-item label="????????????" :label-width="500" required> -->
        <!-- <el-input v-model="input_file_name_rename" class="rename_input"></el-input> -->
        <!-- </el-form-item> -->

        <el-button @click="copy_dialogVisible = false">??????</el-button>
        <el-button type="primary" @click="copy_file()">??????</el-button>
      </div>
    </el-dialog>

    <el-dialog title="??????" :visible.sync="create_dialogVisible" width="40%">
      <div>
        <div v-if="this.file_now.type_flag === 1" class="choose_type">
          <el-radio v-model="choose_radio" label="1">????????????</el-radio>
          <el-radio v-model="choose_radio" label="2">???????????????</el-radio>
        </div>
        <div v-else class="choose_type">
          <el-radio v-model="choose_radio" label="1">????????????</el-radio>
        </div>

        <div v-if="this.choose_radio === '1'" class="choose_model">
          <el-radio v-model="choose_model" label="1">??????????????????</el-radio>
          <el-radio v-model="choose_model" label="2">???????????????????????????</el-radio>
          <el-radio v-model="choose_model" label="3">???????????????????????????</el-radio>
          <el-radio v-model="choose_model" label="4">??????????????????</el-radio>
          <el-radio v-model="choose_model" label="5">?????????????????????</el-radio>
          <el-radio v-model="choose_model" label="6">??????????????????</el-radio>
          <el-radio v-model="choose_model" label="7">????????????????????????</el-radio>
        </div>

        <!-- <el-form-item label="????????????" :label-width="500" required> -->
        <el-input
          placeholder="???????????????????????????15?????????"
          v-model="input_file_name_create"
          class="create_input"
          maxlength="15"
          show-word-limit
        ></el-input>
        <!-- </el-form-item> -->

        <el-button @click="create_dialogVisible = false">??????</el-button>
        <el-button type="primary" @click="create_file()">??????</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs';
  import EditView from '@/components/FileEdit.vue';
  export default {
    name: 'HomeView',
    props: ['teamid'],

    components: { EditView },

    data() {
      return {
        file_id_toshow: 0,
        file_name_toshow: 0,

        doc_data: [
          {
            file_id: 0,
            file_name: '????????????',
            file_flag: 1, //0:test????????? 1:test????????????
            type_flag: 1,
            last_edit_time: undefined,
            file_list: [],
          },
        ],

        doc_data_of_projs_fromserver: [],
        doc_data_of_projs: [
          {
            file_id: 0,
            file_name: '???????????????',
            file_flag: 1, //0:test????????? 1:test????????????
            last_edit_time: undefined,
            file_list: [],
          },
        ],
        tmp: [], //????????????????????????????????????

        props1: {
          children: 'file_list',
          label: 'file_name',
        },

        props2: {
          children: 'file_list',
          label: 'file_name',
        },

        // data_from_server:[],

        rename_dialogVisible: false,
        delete_dialogVisible: false,
        copy_dialogVisible: false,
        create_dialogVisible: false,

        input_file_name_rename: '',
        input_file_name_create: '',

        choose_radio: '1', //1:?????? 2:?????????
        choose_model: '0',

        team_id: this.$route.query.id,

        file_now: [],
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

      treeNodeClick(node) {
        console.log('node_id:' + node.id + ' node_lable:' + node.label);
      },
      //   show(node){
      //       alert('node_id:'+node.id+' node_lable:'+node.label);
      //   },
      handleclick(dropNode) {
        // console.log('tree drag enter: '+dropNode.id+' label:'+dropNode.label);
        // console.log('currLevel:'+dropNode.currLevel);
        console.log('id:' + dropNode.file_id);
      },

      start_rename(file) {
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

      rename_file() {
        this.rename_dialogVisible = false;
        if (this.input_file_name_rename === '')
        {
          this.$message.error('??????????????????');
          return;
        }
        
 
        if (this.file_now.file_flag === 0) {
          //???????????????
          console.log('?????????????????????');
          if (this.file_now.type_flag === 1) {
            //?????????????????????
            let rename_file_ifo = {
              proj_id: '',
              file_id: this.file_now.file_id,
              file_name: this.input_file_name_rename,
              teamid: this.team_id,
              modify_time: this.get_now_time(),
            };
            console.log(rename_file_ifo);
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
          } //?????????????????????
          else {
            console.log('?????????????????????');
            let rename_file_ifo2 = {
              proj_id: this.file_now.project_id,
              file_id: this.file_now.file_id,
              file_name: this.input_file_name_rename,
              teamid: this.team_id,
              modify_time: this.get_now_time(),
            };
            console.log(rename_file_ifo2);
            this.$axios
              .post('project/renameFile', qs.stringify(rename_file_ifo2), {
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
        } else {
          //??????????????????
          console.log('??????????????????');

          let rename_folder_ifo = {
            folder_id: this.file_now.file_id,
            folder_name: this.input_file_name_rename,
            edit_time: this.get_now_time(),
          };
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

      start_delete(file) {
        console.log(file.file_id);
        this.delete_dialogVisible = true;
        this.file_now = file;
      },

      delete_file() {
        this.delete_dialogVisible = false;
        if (this.file_now.file_flag === 0) {
          //????????????
          if (this.file_now.type_flag === 1) {
            //?????????????????????
            console.log('????????????');
            let delete_file_ifo = {
              file_id: this.file_now.file_id,
            };
            console.log(delete_file_ifo);
            this.$axios
              .post('team/deleteTeamFile', qs.stringify(delete_file_ifo), {
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
          } //?????????????????????
          else {
            console.log('????????????');
            let delete_file_ifo = {
              file_id: this.file_now.file_id,
            };
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
        } //???????????????
        else {
          console.log('???????????????');
          let delete_folder_ifo = {
            folder_id: this.file_now.file_id,
          };
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

      start_copy(file) {
        console.log(file.file_id);
        this.copy_dialogVisible = true;
        this.file_now = file;
      },

      copy_file() {
        console.log('????????????');
        this.copy_dialogVisible = false;
        if (this.file_now.file_flag === 0) {
          //????????????
          if (this.file_now.type_flag === 1) {
            //?????????????????????
            let copy_file_ifo = {
              file_id: this.file_now.file_id,
              to_folder_id: this.file_now.parent_folder_id, //to modify
              edit_time: this.get_now_time(),
            };
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
          } //?????????????????????
          else {
            let copy_file_ifo = {
              file_id: this.file_now.file_id,
              copy_to_proj: this.file_now.project_id, //to modify
              copy_time: this.get_now_time(),
            };
            console.log(copy_file_ifo);
            this.$axios
              .post('project/copy_project_file', qs.stringify(copy_file_ifo), {
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
        } //???????????????
        else {
          console.log('???????????????');
          let copy_folder_ifo = {
            folder_id: this.file_now.file_id,
            to_folder_id: this.file_now.parent_folder_id, //to modify
            edit_time: this.get_now_time(),
          };
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

      start_create(file) {
        console.log(file.file_id);
        this.create_dialogVisible = true;
        this.input_file_name_create = '';
        this.file_now = file;
      },

      create_file() {
        this.create_dialogVisible = false;
        if (this.input_file_name_create === '')
        {
          this.$message.error('??????????????????');
          return;
        }
        console.log(this.input_file_name_create);
        // var is_root = this.file_now.file_id = 0 ? 1 : 2;
        var is_root;
        if (this.file_now.file_id == 0) is_root = 1;
        else is_root = 2;
        if (this.choose_radio === '2') {
          //???????????????
          console.log('???????????????');
          let create_folder = {
            team_id: this.team_id,
            is_root: is_root,
            folder_name: this.input_file_name_create,
            father_id: this.file_now.file_id,
            create_time: this.get_now_time(),
          };
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
        } else {
          //????????????
          console.log('????????????');

          if (this.file_now.type_flag === 1) {
            //?????????????????????
            let create_file = {
              file_name: this.input_file_name_create,
              create_time: this.get_now_time(),
              // proj_id:'',
              teamid: this.team_id,
              judge: 1,
              folder_id: this.file_now.file_id,
              model: this.choose_model,
            };
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
          } //?????????????????????
          else {
            let create_file = {
              file_name: this.input_file_name_create,
              create_time: this.get_now_time(),
              proj_id: this.file_now.file_id,
              teamid: this.team_id,
              judge: 0,
              folder_id: this.file_now.file_id,
              model: this.choose_model,
            };
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
        }
      },

      get_file_info() {
        let init_ifo = {
          teamid: this.team_id,
        };
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
              //   console.log(res.data)
              this.doc_data[0].file_list = res.data.team_data;
              this.doc_data_of_projs_fromserver = res.data.project_data;
              this.handle_doc_data_of_projs(this.doc_data_of_projs_fromserver);
              //   this.doc_data = res.data.team_data;
              //   console.log('doc', this.doc_data);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      handle_doc_data_of_projs(data) {
        //???????????????????????????
        for (
          var i = 0;
          i < data.length;
          i++ //????????????
        ) {
          data = JSON.parse(JSON.stringify(data).replace(/projectId/g, 'file_id'));
          data = JSON.parse(JSON.stringify(data).replace(/projName/g, 'file_name'));
          data = JSON.parse(JSON.stringify(data).replace(/files_data/g, 'file_list'));
        }

        this.doc_data_of_projs[0].file_list = data;
        console.log(this.doc_data_of_projs);
      },

      // eslint-disable-next-line no-unused-vars
      into_file(file_id, file_name, is_team_file) {
        // console.log(file_id);
        // this.$store.state.file_id_toshow = file_id;
        // this.$router.push({
        //   path: '/fileedit',
        //   query: { id: file_id, name: file_name, teamid: this.team_id, isTeamFile: is_team_file },
        // });
        this.file_id_toshow = file_id;
        this.file_name_toshow = file_name;
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

<style>
  .create_input {
    display: flex;
    margin: 20px;
    /* justify-content:center; */
    flex-direction: column;
    width: 500px;
  }

  .rename_input {
    display: flex;
    margin-bottom: 20px;
    /* flex-direction:column;
    justify-content: center;
    align-items: center; */
    /* width: 500px; */
  }

  .choose_model {
    display: flex;
    margin: 10px;
    width: 500px;
    flex-wrap: wrap;
  }

  .choose_type {
    display: flex;
    margin: 10px;
    /* padding: 10px; */
  }


  .folders_label {
    color: rgb(10, 10, 10);
  }

  .tree {
    width: 400px;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.18), 0 0 12px rgba(0, 0, 0, 0.08);
  }

  .el-tree-node__content {
    height: 45px !important;
    font-size: 17px;
  }

  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #D4D4D4;
  }
</style>
