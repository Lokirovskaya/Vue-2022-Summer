<template>
  <div id="main">
    <div id="left">
      <el-menu>
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
  };
</script>

<style scoped>
  #main {
    display: table;
    /* flex-direction: row; */
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
    /* width: 100%; */
    text-align: center;
  }
</style>
