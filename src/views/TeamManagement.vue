<template>
  <div>
    <el-table :data="testdata" stripe border>
      <el-table-column prop="userid" label="ID" min-width="15%"></el-table-column>
      <el-table-column prop="username" label="昵称" min-width="20%"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" min-width="20%"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="30%"></el-table-column>
      <el-table-column min-width="30%">
        <template scope="scope">
          <el-button type="primary" size="small" @click="set_admin(scope.row.userid)"
            >设为管理</el-button
          >
          <el-button type="danger" size="small" @click="remove_user(scope.row.userid)"
            >移出团队</el-button
          >
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
        i_am_admin: true,
        testdata: [
          {
            userid: 5,
            username: 'haha',
            truename: '哈哈',
            email: '11@qq.com',
            isadmin: true,
          },
        ],
      };
    },

    methods: {
      set_admin(userid) {
        this.$message.success('成功设置' + userid + '为管理员');
      },

      remove_user(userid) {
        this.$message.success('成功移出' + userid);
      },
    },
  };
</script>
