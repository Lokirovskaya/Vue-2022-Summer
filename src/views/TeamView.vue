<template>
  <div id="main">
    <div id="title">团队标题标题标题</div>
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

        <div>一个项目，还可以放项目缩略图</div>
      </el-card>

      <el-card class="new-proj box-card" shadow="hover">
        <div @click="new_proj_dialog_visible = true">
          <i class="el-icon-plus" style="font-size: 50px"></i>
          <div style="font-size: 18px; color: gray">新建项目</div>
        </div>
      </el-card>

      <!-- new proj prompt dialog -->
      <el-dialog title="新建项目" :visible.sync="new_proj_dialog_visible" width="40%">
        <el-form :model="new_proj_dialog_data">
          <el-form-item label="项目名称" :label-width="new_proj_dialog_label_width" required>
            <el-input v-model="new_proj_dialog_data.proj_name"></el-input>
          </el-form-item>
          <el-form-item label="项目简介" :label-width="new_proj_dialog_label_width">
            <el-input v-model="new_proj_dialog_data.proj_info"></el-input>
          </el-form-item>
          <el-form-item label="项目开始时间" :label-width="new_proj_dialog_label_width">
            <el-input v-model="new_proj_dialog_data.start_time"></el-input>
          </el-form-item>
          <el-form-item label="项目结束时间" :label-width="new_proj_dialog_label_width">
            <el-input v-model="new_proj_dialog_data.end_time"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="new_proj_dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="create_proj()">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="button">
      <router-link to="/trashbin">
        <el-button icon="el-icon-delete">回收站</el-button>
      </router-link>
    </div>

    <el-divider>团队成员</el-divider>

    <div id="members">
      <div class="one-member">
        <div id="avatar">头像</div>
        <div id="username">用户名</div>
      </div>

      <div class="one-member">
        <div id="avatar">头像</div>
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
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'TeamView',

    data() {
      return {
        new_proj_dialog_visible: false,
        new_proj_dialog_label_width: '120px',
        new_proj_dialog_data: {
          proj_name: '',
          team_id: 0,
          proj_info: '',
          start_time: '',
          end_time: '',
        },
      };
    },

    methods: {
      create_proj() {
        this.new_proj_dialog_visible = false;

        let post_data = this.new_proj_dialog_data;
        post_data.team_id = 0;

        console.log(post_data);

        this.$axios
          .post('/project/createProj ', qs.stringify(post_data), {
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

      //   edit_proj(proj_id) {},

      delete_proj(proj_id) {
        this.$confirm('是否删除项目？', '删除项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message.success('成功删除项目' + proj_id);
        });
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
