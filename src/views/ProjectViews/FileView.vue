<template>
  <div id="file">
    <div id="title">
    </div>
    <div class="title1">
      <span style="text-align: left;"><b>文档区</b></span><span style="position: relative;left: 33%;top:2px;">
        <el-tooltip class="item" effect="dark" content="新建文档" placement="bottom">
          <el-button type="primary" @click="new_file_dialog_visible = true" circle size="mini">
            <i class="el-icon-circle-plus-outline"></i>
          </el-button>
        </el-tooltip>
      </span>
    </div>
    <div id="files">
      <el-card class="one-file box-card" shadow="hover" v-for="item in file_list" :key="item.file_id">
        <div class="box-card-content" @click="edit_file(item.file_id, item.file_name)">
          <el-tooltip class="item" effect="dark" :content="'更新于' + item.last_modify_time" placement="left-end">
            <div class="cardImg">
              <img :src="setImg(item.file_id)">
            </div>
          </el-tooltip>
        </div>
        <div style="text-align: left">
          <div
            style="position: relative; bottom: 5px; right: 10px;width: 100px;	overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
            {{ item.file_name }}</div>
          <el-dropdown style="position: relative; bottom: 22px;left: 93%;">
            <i class="el-icon-more" style="font-size: 18px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="file_rename_dialog_visible = true; file_rename_id = item.file_id;">重命名
                </div>
              </el-dropdown-item>
              <el-dropdown-item style="color: red">
                <div @click="delete_file(item.file_id)">删除文档</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-card>

      <!-- new proj prompt dialog -->
      <el-dialog title="新建文档" :visible.sync="new_file_dialog_visible" width="40%">
        <div style="margin-left:10%;margin-right:10%;">
          <el-input placeholder="请输入新建文档名(限15字)" prefix-icon="el-icon-notebook-2" v-model="new_file_name"
            maxlength="15">
          </el-input>
          <el-select v-model="value" clearable placeholder="请选择模板(非必选)" style="position: relative;top:10px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div slot="footer">
          <el-button @click="new_file_dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="create_file">确定</el-button>
        </div>
      </el-dialog>

      <!--rename file prompt dialog -->
      <el-dialog title="重命名文档" :visible.sync="file_rename_dialog_visible" width="40%">
        <div style="margin-left:10%;margin-right:10%;">
          <el-input placeholder="请输入新名字(限15字)" prefix-icon="el-icon-notebook-2" v-model="file_rename" maxlength="15">
          </el-input>
        </div>
        <div slot="footer">
          <el-button @click="file_rename_dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="rename_file">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import qs from "qs";
// import DocCenter from '@/components/DocCenter.vue';
export default {
  // components: { DocCenter},
  name: 'FileView',
  data() {
    return {
      new_file_dialog_visible: false, //控制新建文档对话框的显示
      new_file_name: '', //新建文档名
      file_rename_dialog_visible: false, //控制重命名文档对话框的显示
      file_rename_id: 0, //重命名文档的id
      file_rename: '',
      file_list: [], //文档列表
      Img: '../../assets/file1.png',
      value: '',
      options: [{
        value: 1,
        label: '会议纪要模板'
      }, {
        value: 2,
        label: '架构设计说明书模板'
      }, {
        value: 3,
        label: '需求规格说明书模板'
      }, {
        value: 4,
        label: '项目管理看板'
      }, {
        value: 5,
        label: '项目计划书模板'
      }, {
        value: 6,
        label: '项目周报模板'
      }, {
        value: 7,
        label: '需求调研报告模板'
      }],
    }
  },
  methods: {
    setImg(file_id) {
      var i = file_id % 5;
      if (i === 0) {
        return require('../../assets/file1.png');
      } else if (i === 1) {
        return require('../../assets/file2.png');
      } else if (i === 2) {
        return require('../../assets/file3.png');
      } else if (i === 3) {
        return require('../../assets/file4.png');
      } else if (i === 4) {
        return require('../../assets/file5.png');
      }
    },
    edit_file(file_id, file_name) {
      console.log(file_id);
      this.$router.push({ path: '/fileedit', query: { id: file_id, name: file_name, teamid: this.$route.query.teamid, projid: this.$route.query.id, isTeamFile: 0 } }); //跳转到该文档的编辑界面
    },
    rename_file() {
      console.log(this.file_rename_id);
      if (this.file_rename === '') {
        this.$message.error('文档名不能为空');
      } else {
        var time = this.get_now_time();
        this.$axios.post('/project/renameFile', qs.stringify({ proj_id: this.$route.query.id, file_id: this.file_rename_id, file_name: this.file_rename, teamid: this.$route.query.teamid, modify_time: time }), {//to change teamid
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              console.log(res.data);//测试一下
              this.$message.success('重命名成功');
              this.file_rename_dialog_visible = false;
              for (var item of this.file_list) {
                if (item.file_id === this.file_rename_id) {
                  item.file_name = this.file_rename;
                }
              }
              //console.log(this.file_list);
              this.file_rename = ''; //争取把源数据(文档名)也修改了
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    delete_file(file_id) {
      this.$confirm('是否删除文档？', '删除文档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$axios.post('/project/deleteFile', qs.stringify({ file_id: file_id }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              console.log(res.data);//测试一下
              //this.$message.success('重命名成功' + this.file_rename_id);
              var i = 0;
              for (var item of this.file_list) {
                if (item.file_id === file_id) {
                  break;
                } else {
                  i++;
                }
              }
              this.file_list.splice(i, 1);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
        //this.$message.success('成功删除文档' + file_id);
      });
    },
    create_file() {
      if (this.new_file_name === '') {
        this.$message.error('文档名不能为空');
      } else {
        let time = this.get_now_time();
        let create_file_ifo = {
          file_name: this.new_file_name, create_time: time, proj_id: this.$route.query.id, teamid: this.$route.query.teamid, judge: 0, model: this.value === '' ? 0 : this.value, folder_id: 114514
        }
        console.log(create_file_ifo);
        // console.log(this.$route.query.id,);
        this.$axios.post('/project/createFile', qs.stringify(create_file_ifo), {// to change teamid
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              console.log(res.data);//测试一下
              this.$message.success('新建文档成功');
              let fid = res.data.file_id;
              let item = {
                file_id: fid,
                file_name: this.new_file_name,
                file_creator: this.$store.state.username,
                create_time: time,
                last_modify_time: time,
                last_modify_user_id: this.$store.state.userid,
                last_modify_user_name: this.$store.state.username,
              };
              this.file_list.push(item);
              this.new_file_dialog_visible = false;
              this.new_file_name = ''; //争取把源数据(文档名)也修改了
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
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
      var time_str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      return time_str;
    },
  },
  mounted() {
    this.$axios.post('/project/getFileList', qs.stringify({ proj_id: this.$route.query.id }), {
      headers: {
        userid: this.$store.state.userid,
        token: this.$store.state.token,
      }
    })
      .then(res => {
        if (res.data.errno === 0) {
          console.log(res.data);//测试一下
          //this.$message.success('重命名成功' + this.file_rename_id);
          this.file_list = res.data.data; //争取把源数据(文档名)也修改了
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont";
  /* Project id 3570869 */
  src: url('../../font/iconfont.woff2') format('woff2'),
    url('../../font/iconfont.woff') format('woff'),
    url('../../font/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  fill: currentColor;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.menu-item111 {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  border-top-color: initial;
  border-top-style: none;
  border-top-width: initial;
  border-right-color: initial;
  border-right-style: none;
  border-right-width: initial;
  border-bottom-color: initial;
  border-bottom-style: none;
  border-bottom-width: initial;
  border-left-color: initial;
  border-left-style: none;
  border-left-width: initial;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  background-color: transparent;
  border-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  padding: 0.25rem;
  padding-top: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  margin-right: 0.25rem;
}

.cardImg {
  width: 180px;
  height: 70px;
  position: relative;
  right: 10px;
  bottom: 10px;
  border-radius: 0.5rem;
}

.menu-item111 svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

#file {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
}


#title {
  width: 100%;
  padding-top: 10px;
  text-align: left;
  font-size: 20px;
  padding-left: 30px;
}

#title1 {
  width: 100%;
  padding-top: 10px;
  text-align: left;
  font-size: 20px;
  padding-left: 30px;
  margin-left: 10%;
  margin-right: 10%;
}

#files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px;
  min-height: 200px;
  margin-left: 10%;
  margin-right: 10%;
}

.one-file {
  width: 200px;
  height: 115px;
  margin: 10px;

}
</style>