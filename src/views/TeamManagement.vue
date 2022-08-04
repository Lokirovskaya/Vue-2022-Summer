<template>
  <div>
    <el-table :data="member_data" stripe border>
      <el-table-column label="头像" min-width="10%">
        <template scope="scope">
          <img class="avatar" :src="'http://stcmp.shlprn.cn/api' + scope.row.member_photo" />
        </template>
      </el-table-column>
      <el-table-column prop="member_id" label="ID" min-width="15%"></el-table-column>
      <el-table-column prop="member_name" label="昵称" min-width="20%"></el-table-column>
      <el-table-column prop="member_truename" label="真实姓名" min-width="20%"></el-table-column>
      <el-table-column prop="member_email" label="邮箱" min-width="30%"></el-table-column>
      <el-table-column label="权限" min-width="20%">
        <template scope="scope">
          {{ ['成员', '管理员', '创建者'][scope.row.member_permission] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="30%">
        <template scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="set_admin(scope.row.member_id)"
            v-if="my_permission >= 1 && scope.row.member_permission === 0"
            >设为管理</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="remove_admin(scope.row.member_id)"
            v-else-if="my_permission === 2 && scope.row.member_permission === 1"
            >取消管理</el-button
          >
          <el-button type="info" size="small" disabled v-else>设为管理</el-button>

          <el-button
            type="danger"
            size="small"
            @click="remove_user(scope.row.member_id)"
            v-if="my_permission > scope.row.member_permission"
            >移出团队</el-button
          >
          <el-button type="info" size="small" disabled v-else>移出团队</el-button>
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
        let post_data = {
          teamid: this.$route.query.id,
          userid: userid,
        };

        this.$axios
          .post('/team/authorize_admin', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('设置管理员成功');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      // eslint-disable-next-line no-unused-vars
      remove_admin(userid) {
        this.$message.warning('还没实现的功能');
      },

      remove_user(userid) {
        let post_data = {
          teamid: this.$route.query.id,
          userid: userid,
        };

        this.$axios
          .post('/team/delete_member', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('移除成员成功');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
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

    watch: {
      $route(to, from) {
        if (to.query.id !== from.query.id) {
          this.id = to.query.id;
          this.get_member_data();
        }
      },
    },
  };
</script>

<style scoped>
  .avatar {
    width: 15px;
    height: 15px;
    border-radius: 8px;
  }
</style>
