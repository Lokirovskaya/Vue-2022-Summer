<template>
  <div>
    <el-table :data="member_data" stripe border>
      <el-table-column label="头像" min-width="10%">
        <template scope="scope">
          <img class="avatar" :src="'http://stcmp.shlprn.cn' + scope.row.member_photo" />
          <!-- <img :src="'http://stcmp.shlprn.cn'+this.$store.state.user_photo" class="avatar"> -->
        </template>
      </el-table-column>
      <el-table-column prop="member_id" label="ID" min-width="15%"></el-table-column>
      <el-table-column prop="member_name" label="昵称" min-width="20%"></el-table-column>
      <el-table-column prop="member_truename" label="真实姓名" min-width="20%"></el-table-column>
      <el-table-column prop="member_email" label="邮箱" min-width="30%"></el-table-column>
      <el-table-column label="权限" min-width="20%">
        <template scope="scope">
          {{ ['游客', '普通用户', '管理员'][scope.row.member_permission] }}
        </template>
      </el-table-column>
      <el-table-column min-width="30%">
        <template scope="scope">
          <el-button type="primary" size="small" @click="set_admin(scope.row.member_id)">设为管理</el-button>
          <el-button type="danger" size="small" @click="remove_user(scope.row.member_id)">移出团队</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'TeamManagement',

    data() {
      return {
        my_permission: 0,
        member_data: [], // member_id, name, photo, truename, email, permission
      };
    },

    methods: {
      set_admin(userid) {
        this.$message.success('成功设置' + userid + '为管理员');
      },

      remove_user(userid) {
        this.$message.success('成功移出' + userid);
      },

      get_member_data() {
        this.$axios
          .post('/team/team_manage', qs.stringify({ teamid: this.$route.query.id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            this.my_permission = res.data.permission;
            this.member_data = res.data.members;
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
    },

    created() {
      this.get_member_data();
    },
  };
</script>

<style scoped>
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(230,230,250);
  }
</style>
