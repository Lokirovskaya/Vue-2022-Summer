<template>
  <div id="main">
    <div id="left">
      <el-menu>
        <el-submenu v-for="(team, i) in teamdata" :key="i" :index="'1-' + i">
          <template slot="title">
            <router-link :to="{ path: '/team', query: { id: team.teamid } }">
              <i class="el-icon-location"></i>
              <span>{{ team.teamname }}</span>
            </router-link>
          </template>

          <el-menu-item v-for="(proj, j) in team.proj" :key="j" :index="'1-' + i + '-' + j">
            <router-link :to="{ path: '/project', query: { id: proj.proj_id } }">
              {{ proj.proj_name }}
            </router-link>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="2">
          <template slot="title">
            <div @click="create_team_prompt()">
              <i class="el-icon-plus"></i>
              <span>新建团队</span>
            </div>
          </template>
        </el-menu-item>
      </el-menu>
    </div>

    <div id="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'HomeView',

    data() {
      return {
        // 结构见文档 /team/userspace
        teamdata: [],
      };
    },

    methods: {
      create_team_prompt() {
        let teamname;

        this.$prompt('请输入团队名', '新建团队', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '团队名不能为空',
        })
          .then(({ value }) => {
            if (value === '') return;
            teamname = value;
            this.create_team(teamname);
          })
          .catch(() => {
            return;
          });
      },

      create_team(teamname) {
        this.$axios
          .post('/team/create_team', qs.stringify({ teamname: teamname }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.errno === 0) {
              this.$message.success('团队创建成功！');
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

    },

    created() {
      this.$axios
        .post('/team/userspace', qs.stringify({}), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          },
        })
        .then((res) => {
          this.teamdata = res.data.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  };
</script>

<style scoped>
  #main {
    display: table;
    width: 100%;
    height: 100%;
  }

  #left {
    display: table-cell;
    width: 250px;
    min-height: 100%;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  #right {
    display: table-cell;
    text-align: center;
  }

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
