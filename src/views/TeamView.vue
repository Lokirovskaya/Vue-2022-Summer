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
        <div @click="create_proj()">
          <i class="el-icon-plus" style="font-size: 50px"></i>
          <div style="font-size: 18px; color: gray">新建项目</div>
        </div>
      </el-card>
    </div>

    <div class="button">
    <el-button icon="el-icon-delete">回收站</el-button>
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
  export default {
    name: 'TeamView',

    data() {
      return {};
    },

    methods: {
      create_proj() {
        this.$message.success('create proj pressed');
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
        //   .catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消删除',
        //     });
        //   });
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
