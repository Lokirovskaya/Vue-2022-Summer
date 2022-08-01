<template>
  <div>
    <el-table :data="testdata" stripe border>
      <el-table-column prop="userid" lable="ID"></el-table-column>
      <el-table-column prop="username" lable="昵称"></el-table-column>
      <el-table-column prop="truename" lable="真实姓名"></el-table-column>
      <el-table-column prop="email" lable="邮箱"></el-table-column>
      <el-table-column>
        <template>
          <el-button type="info" size="small">设为管理</el-button>
          <el-button type="warning" size="small">移出团队</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'TeamManagement',

    data() {
      return {
        testdata: [
          {
            userid: 5,
            username: 'haha',
            truename: '哈哈',
            email: '11@qq.com',
          },
        ],
      };
    },
  };
</script>
