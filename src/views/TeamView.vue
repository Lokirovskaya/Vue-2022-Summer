<template>
  <div id="main">
    <div id="title">{{ team_name }} (id: {{ team_id }})</div>
    <el-divider>团队项目</el-divider>

    <div id="projs">
      <el-card
        v-for="(proj, i) in proj_data"
        :key="i"
        :index="'1-' + i"
        class="one-proj box-card"
        shadow="hover"
      >
        <div style="text-align: right">
          <el-dropdown>
            <i class="el-icon-more" style="font-size: 18px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="edit_proj_prompt(proj)">编辑项目</div>
              </el-dropdown-item>
              <el-dropdown-item style="color: red">
                <div @click="delete_proj_prompt(proj.proj_id)">删除项目</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <router-link :to="{ path: '/project', query: { id: proj.proj_id } }">
            <el-link class="proj-title">{{ proj.proj_name }}</el-link>
          </router-link>
          <br/>
          <br/>
          <div>{{ proj.proj_info }}</div>
        </div>
      </el-card>

      <el-card class="new-proj box-card" shadow="hover">
        <div @click="create_proj_prompt()">
          <i class="el-icon-plus" style="font-size: 50px"></i>
          <div style="font-size: 18px; color: gray">新建项目</div>
        </div>
      </el-card>
    </div>

    <div class="button">
      <router-link :to="{ path: '/trashbin', query: { id: this.team_id } }">
        <el-button icon="el-icon-delete">回收站</el-button>
      </router-link>
    </div>

    <el-divider>团队成员</el-divider>

    <div id="members">
      <div class="one-member" v-for="member in member_data" :key="member.member_id">
        <img :src="'http://stcmp.shlprn.cn' + member.member_photo" class="avatar" />
        <div id="username">{{ member.member_name }}</div>
      </div>

      <div class="one-member">
        <el-button
          @click="invite_member_prompt()"
          class="avatar invite-member"
          style="background-color: #eee"
        >
          <i class="el-icon-plus"></i>
        </el-button>
        <div id="username">邀请新成员</div>
      </div>
    </div>

    <div class="button">
      <router-link :to="{ path: '/teammanagement', query: { id: team_id } }">
        <el-button type="primary">成员管理</el-button>
      </router-link>
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
        <el-button type="primary" @click="edit_proj()">确定</el-button>
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
        team_name: '',

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
          proj_id: 0,
          proj_name: '',
          proj_info: '',
          start_time: '',
          end_time: '',
        },
        editing_proj_id: 0,

        proj_data: [], // proj_id, proj_name, proj_photo
        member_data: [], // member_id, member_name, member_photo
      };
    },

    methods: {
      create_proj_prompt() {
        this.new_proj_dialog_visible = true;
      },

      create_proj() {
        if (this.new_proj_dialog_data.proj_name.trim() === '') {
          this.$message.error('请输入项目名');
          return;
        }

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
            this.$router.go(0);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      edit_proj_prompt(proj_data) {
        this.edit_proj_dialog_visible = true;
        this.edit_proj_dialog_data.proj_id = proj_data.proj_id;
        this.edit_proj_dialog_data.proj_name = proj_data.proj_name;
        this.edit_proj_dialog_data.proj_info = proj_data.proj_info;
        this.edit_proj_dialog_data.start_time = proj_data.start_time;
        this.edit_proj_dialog_data.end_time = proj_data.end_time;
      },

      edit_proj() {
        if (this.edit_proj_dialog_data.proj_name.trim() === '') {
          this.$message.error('请输入项目名');
          return;
        }

        this.edit_proj_dialog_visible = false;

        let post_data = this.edit_proj_dialog_data; // 参考 edit_proj_prompt

        this.$axios
          .post('/project/modifyProjInfo', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('编辑项目成功');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
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

      delete_proj(proj_id) {
        console.log('delete:' + proj_id);
        let delete_proj_ifo = {
          proj_id: proj_id,
          time: this.get_now_time(),
        };
        console.log('proj_id:' + delete_proj_ifo.proj_id),
          console.log('time:' + delete_proj_ifo.time),
          this.$axios
            .post('/project/deleteProj', qs.stringify(delete_proj_ifo), {
              headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
              },
            })
            .then((res) => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.$router.go(0);
              } else {
                this.$message.error(res.data.msg);
              }
              this.$router.go(0);
            })
            .catch((err) => {
              this.$message.error(err);
            });
      },

      invite_member_prompt() {
        let invite_key;

        this.$prompt('请输入对方 UID 或邮箱', '邀请成员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: 'UID 或邮箱不能为空',
        })
          .then(({ value }) => {
            if (value === '') return;
            invite_key = value;
            this.invite_member(invite_key);
          })
          .catch(() => {
            return;
          });
      },

      invite_member(invite_key) {
        let post_data = {
          teamid: this.team_id,
          userid: invite_key,
        };

        this.$axios
          .post('/team/invite_user', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('成功邀请成员！');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      get_now_time() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        return time;
      },

      get_team_info() {
        this.team_id = this.$route.query.id;

        this.$axios
          .post('/team/teamspace', qs.stringify({ teamid: this.team_id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            // console.log(res.data.projs);
            console.log(res.data);
            this.team_name = res.data.teamname;
            this.proj_data = res.data.projs;
            this.member_data = res.data.members;
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

  .proj-title {
    font-size: 25px;
    color: #333;
    font-weight: bold;
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

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border-style: solid;
    border-color: rgb(230, 230, 250);
    border-width: 1px;
    /* background-color: greenyellow; */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar :hover {
    border-radius: 45px;
    background-color: rgb(230, 230, 250);
    opacity: 0.9;
  }

  #username {
    color: grey;
    margin-top: 10px;
  }

  .invite-member {
    font-size: 30px;
  }

  .button {
    margin-top: 20px;
    padding-left: 40px;
    text-align: left;
  }

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
