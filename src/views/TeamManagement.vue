<template>
  <div>
    <el-table :data="testdata" stripe border>
      <el-table-column prop="userid" label="ID" min-width="15%"></el-table-column>
      <el-table-column prop="username" label="昵称" min-width="20%"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" min-width="20%"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="30%"></el-table-column>
      <el-table-column min-width="30%">
        <template>
          <el-button type="primary" size="small">设为管理</el-button>
          <el-button type="danger" size="small">移出团队</el-button>
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
