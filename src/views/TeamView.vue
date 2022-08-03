<template>
  <div id="main">
    <div id="title">团队标题标题标题 (id: {{team_id}})</div>
    <el-divider>团队项目</el-divider>

    <div id="projs">
      <el-card class="one-proj box-card" shadow="hover">
        <div style="text-align: right">
          <el-dropdown>
            <i class="el-icon-more" style="font-size: 18px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="edit_proj(0)">编辑项目</div>
              </el-dropdown-item>
              <el-dropdown-item style="color: red">
                <div @click="delete_proj(0)">删除项目</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div>因为 teamspace 好像坏掉了，所以这里没有显示项目，可以在左边导航栏看到<br><br>右边的那个新建项目是可用的</div>
      </el-card>

      <el-card class="new-proj box-card" shadow="hover">
        <div @click="create_proj_prompt()">
          <i class="el-icon-plus" style="font-size: 50px"></i>
          <div style="font-size: 18px; color: gray">新建项目</div>
        </div>
      </el-card>
    </div>

    <div class="button">
      <router-link :to="{path: '/trashbin', query: {id: this.team_id}}">
        <el-button icon="el-icon-delete">回收站</el-button>
      </router-link>
    </div>

    <el-divider>团队成员</el-divider>

    <div id="members">
      <div class="one-member">
        <el-button id="avatar">头像</el-button>
        <div id="username">用户名</div>
      </div>

      <div class="one-member">
        <el-button id="avatar">头像</el-button>
        <div id="username">用户名</div>
      </div>

      <div class="one-member">
        <div id="avatar" style="background-color: #eee">加号</div>
        <div id="username">邀请新成员</div>
      </div>
    </div>

    <div class="button">
      <el-button type="primary">成员管理</el-button>
    </div>

    <!-- new proj prompt dialog -->
    <el-dialog title="新建项目" :visible.sync="new_proj_dialog_visible" width="40%">
      <el-form :model="new_proj_dialog_data">
        <el-form-item label="项目名称" :label-width="dialog_label_width" required>
          <el-input v-model="new_proj_dialog_data.proj_name"></el-input>
        </el-form-item>
        <el-form-item label="项目简介" :label-width="dialog_label_width">
          <el-input v-model="new_proj_dialog_data.proj_info"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" :label-width="dialog_label_width">
          <el-input v-model="new_proj_dialog_data.start_time"></el-input>
        </el-form-item>
        <el-form-item label="项目结束时间" :label-width="dialog_label_width">
          <el-input v-model="new_proj_dialog_data.end_time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="new_proj_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="create_proj()">确定</el-button>
      </div>
    </el-dialog>

    <!-- edit proj prompt dialog -->
    <el-dialog title="编辑项目" :visible.sync="edit_proj_dialog_visible" width="40%">
      <el-form :model="edit_proj_dialog_data">
        <el-form-item label="项目名称" :label-width="dialog_label_width" required>
          <el-input v-model="edit_proj_dialog_data.proj_name"></el-input>
        </el-form-item>
        <el-form-item label="项目简介" :label-width="dialog_label_width">
          <el-input v-model="edit_proj_dialog_data.proj_info"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" :label-width="dialog_label_width">
          <el-input v-model="edit_proj_dialog_data.start_time"></el-input>
        </el-form-item>
        <el-form-item label="项目结束时间" :label-width="dialog_label_width">
          <el-input v-model="edit_proj_dialog_data.end_time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="edit_proj_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="create_proj()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'TeamView',

    data() {
      return {
        team_id: 0,

        dialog_label_width: '120px',

        new_proj_dialog_visible: false,
        new_proj_dialog_data: {
          proj_name: '',
          team_id: 0, // 发送前记得改为 this.team_id
          proj_info: '',
          start_time: '',
          end_time: '',
        },

        edit_proj_dialog_visible: false,
        edit_proj_dialog_data: {
          proj_name: '',
          team_id: 0,
          proj_info: '',
          start_time: '',
          end_time: '',
        },
        editing_proj_id: 0,
      };
    },

    methods: {
      create_proj_prompt() {
        this.new_proj_dialog_visible = true;
      },

      create_proj() {
        this.new_proj_dialog_visible = false;

        let post_data = this.new_proj_dialog_data;
        post_data.team_id = this.team_id;

        this.$axios
          .post('/project/createProj', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('新建项目成功');
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      edit_proj_prompt(proj_id) {
        this.edit_proj_dialog_visible = true;
        this.editing_proj_id = proj_id;
      },

      edit_proj() {
        this.edit_proj_dialog_visible = false;

        // let post_data = this.edit_proj_dialog_data;
      },

      delete_proj_prompt(proj_id) {
        this.$confirm('是否删除项目？', '删除项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // this.$message.success('成功删除项目' + proj_id);
          this.delete_proj(proj_id);
        });
      },

      // eslint-disable-next-line no-unused-vars
      delete_proj(proj_id) {
        // todo~ 
        let delete_proj_ifo = {
          proj_id:this.$route.query.id,
          time:this.get_now_time(),
        }
        this.$axios.post('/project/deleteProj', qs.stringify({delete_proj_ifo}), {
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
  })
  .catch((err) => {
    this.$message.error(err);
  });
        // alert(this.get_now_time());
      },

      get_now_time(){
          var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;
    hour = hour < 10 ? ('0' + hour) : hour;
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return time;
      },
      

      get_team_info() {
        this.team_id = this.$route.query.id;

        this.$axios
          .post('/team/teamspace', qs.stringify({ team_id: this.team_id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            console.log(res.data.data);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
    },

    created() {
      this.get_team_info();
    },

    watch: {
      $route(to, from) {
        if (to.query.id !== from.query.id) {
          this.id = to.query.id;
          this.get_team_info();
        }
      },
    },
  };
</script>

<style scoped>
  #main {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  #title {
    width: 100%;
    padding-top: 10px;
    text-align: left;
    font-size: 30px;
  }

  #projs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
    min-height: 200px;
  }

  .one-proj {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 10px;
  }

  .new-proj {
    width: 40px;
    height: 200px;
    padding: 20px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #members {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 40px;
  }

  .one-member {
    margin: 10px;
  }

  #avatar {
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: greenyellow;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #username {
    color: grey;
    margin-top: 10px;
  }

  .button {
    margin-top: 20px;
    padding-left: 40px;
    text-align: left;
  }
</style>
