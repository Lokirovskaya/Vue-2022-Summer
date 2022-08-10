<template>
  <!-- <div id="main"> -->
  <div>
    <el-table :data="trash_bin_projs" stripe border>
      <el-table-column prop="proj_name" label="项目名称" min-width="20%"></el-table-column>
      <el-table-column prop="proj_info" label="项目简介" min-width="30%"></el-table-column>
      <el-table-column prop="delete_time" label="删除时间" min-width="20%"></el-table-column>
      <el-table-column min-width="30%">
        <template scope="scope">
          <el-button type="success" size="small" @click="recover_proj(scope.row.proj_id)">恢复项目</el-button>
          <el-button type="danger" size="small" @click="clear_proj(scope.row.proj_id)">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'ProjectTrashBin',
    props: ['teamid'],
    data() {
      return {
        // trash_bin_projs: [
        // {proj_id: 1, proj_name: '测试1', proj_info: 'aaa', delete_time: '111'},
        // {proj_id: 2, proj_name: '测试2', proj_info: 'bbb', delete_time: '222'},],
        trash_bin_projs: [],
        team_id: this.teamid,
      };
    },
    methods: {
      recover_proj(proj_id) {
        this.$axios
          .post('/project/recover', qs.stringify({ proj_id }), {
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
            this.$router.go(0);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      clear_proj(proj_id) {
        this.$axios
          .post('project/clearProj', qs.stringify({ proj_id }), {
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
            this.$router.go(0);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      init_trashbin() {
        let teamid_ifo = {
          team_id: this.team_id,
        };
        this.$axios
          .post('/project/getDeletedProjList', qs.stringify(teamid_ifo), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            // console.log(res.data.data);
            if (res.data.errno === 0) {
              // this.$message.success(res.data.msg);
              console.log(res.data.data);
              this.trash_bin_projs = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
    },
    mounted: function () {
      // alert('页面一加载，就会弹出此窗口')
      // alert(this.team_id);
      this.init_trashbin();
    },
  };
</script>

<style scoped>
  #main {
    width: 100%;
    min-height: 100%;
    /* 如果保留下面这行会有神秘 bug，我觉得是 vue 的问题 */
    /* padding: 20px; */
  }

  #title {
    width: 100%;
    padding-top: 10px;
    text-align: left;
    font-size: 30px;
  }
</style>
