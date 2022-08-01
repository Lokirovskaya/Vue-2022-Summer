<template>
  <div id="main">
    <div id="top">
      上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏上方导航栏
    </div>

    <div id="bottom">
      <div id="left">
        <el-menu id="menu">
          <el-submenu v-for="(team, i) in testdata" :key="team" :index="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ team.teamname }}</span>
            </template>

            <el-menu-item v-for="(proj, j) in team.projs" :key="proj" :index="i + '-' + j">
              {{ proj.projname }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <div id="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',

    data() {
      return {
        testdata: [
          {
            teamname: '组1',
            projs: [{ projname: '项目1' }, { projname: '项目2' }, { projname: '项目3' }],
          },
          {
            teamname: '组2',
            projs: [{ projname: '项目11' }, { projname: '项目22' }],
          },
        ],
      };
    },
    methods: {},
  };
</script>

<style scoped>
  #main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #top {
    background-color: #eee;
    height: 80px;
  }

  #bottom {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  #left {
    width: 250px;
    text-align: left;
    background-color: #eee;
  }

  /* #right { } */
</style>
