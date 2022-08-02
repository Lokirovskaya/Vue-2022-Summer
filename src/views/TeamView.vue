<template>
  <div id="main">
    <div id="title">团队标题标题标题</div>
    <el-divider>团队项目</el-divider>

    <div id="projs">
      <el-card class="one-proj box-card"> 一个项目，还可以放项目缩略图 </el-card>
      <el-card class="one-proj box-card"> 一个项目，还可以放项目缩略图 </el-card>
      <el-card class="new-proj box-card"> 新建项目 </el-card>
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
        <div id="avatar" style="background-color: #eee;">加号</div>
        <div id="username">邀请新成员</div>
      </div>
    </div>

    <div id="buttons">
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

    methods: {},
  };
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
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
    height: 300px;
    padding: 15px;
  }

  .one-proj {
    width: 200px;
    padding: 20px;
    margin: 10px;
  }

  .new-proj {
    width: 50px;
    padding: 20px;
    margin: 10px;
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

  #buttons {
    margin-top: 20px;
    padding-left: 40px;
    text-align: left;
  }
</style>
