<template>
  <div id="main">
    <div id="left">
      <el-menu>
        <el-submenu v-for="(team, i) in testdata" :key="team" :index="'1-' + i">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ team.teamname }}</span>
          </template>

          <el-menu-item v-for="(proj, j) in team.projs" :key="proj" :index="'1-' + i + '-' + j">
            {{ proj.projname }}
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="2">
          <template slot="title">
            <div @click="create_team()">
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
        testdata: [
          {
            teamname: '团队1',
            projs: [{ projname: '项目1' }, { projname: '项目2' }, { projname: '项目3' }],
          },
          {
            teamname: '团队2',
            projs: [{ projname: '项目11' }, { projname: '项目22' }],
          },
        ],
      };
    },

    methods: {
      create_team() {
        let teamname;

        this.$prompt('请输入团队名', '新建团队', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '团队名不能为空',
        })
          .then(({ value }) => {
            teamname = value;
          })
          .catch(() => {
            return;
          });

        if (teamname === '') return;

        this.$axios
          .post('/team/create_team', qs.stringify({ teamname: teamname }), {
            headers: {
              username: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
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
</style>
