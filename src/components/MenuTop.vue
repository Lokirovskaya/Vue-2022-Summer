<template>
    <div id="top">
      <el-col :span="12">
        <div class="grid-content">
          <el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal" @select="SelectIndex">

            <el-menu-item index="1">
              导航1
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">导航2</template>
              <router-link :to="{ path: 'sector', query: { name: 'discussion' } }">
                <el-menu-item index="2-1"><i class="el-icon-position"></i>导航21</el-menu-item>
              </router-link>
              <router-link :to="{ path: 'sector', query: { name: 'recommendation' } }">
                <el-menu-item index="2-2"><i class="el-icon-collection"></i>导航22</el-menu-item>
              </router-link>
              <router-link :to="{ path: 'sector', query: { name: 'exercise' } }">
                <el-menu-item index="2-3"><i class="el-icon-medal"></i>导航23</el-menu-item>
              </router-link>
              <router-link :to="{ path: 'sector', query: { name: 'campus' } }">
                <el-menu-item index="2-4"><i class="el-icon-present"></i>导航24</el-menu-item>
              </router-link>
              <router-link :to="{ path: 'sector', query: { name: 'resource' } }">
                <el-menu-item index="2-5"><i class="el-icon-download"></i>导航25</el-menu-item>
              </router-link>
            </el-submenu>
            <!--
            <el-menu-item index="3" v-show="this.$store.getters.is_admin">
              管理员界面
            </el-menu-item>
            -->
          </el-menu>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content" style="text-align: right">
          <div v-if="this.$store.state.login_state === 0">
            <el-link :underline="false" style="position: relative;bottom:-19px" @click="goto_login">登录/注册
            </el-link>
            &nbsp;&nbsp;
          </div>
          <div v-else>
            <el-dropdown @command="User_Command">
              <div>
                <img :src="'http://43.138.55.69' + this.$store.state.user_photo"
                  style="height: 35px;width: 35px;position: relative;bottom: -14px; border-radius: 3px;">
                <!--<el-avatar style="position: relative;bottom: -13.5px" shape="square" :size="35" v-bind:src="User.pho"></el-avatar>-->
                <span style="position: relative;bottom: -3px">&nbsp;用户名&nbsp;&nbsp;</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link :to="{ path: '/personcenter', query: { user: this.$store.state.username } }">
                  <el-dropdown-item command="a">个人中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </div>
</template>

<script>
export default {
  name: 'MenuTop',

  methods: {
    goto_login() {
      this.$router.push({ path: '/login'});
    },
    goto_logout() {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //this.$store.commit('set_userstate_to_unlogged'); //切换到游客状态
        this.$store.commit('set_userid', 0);
        this.$store.commit('set_username', '');
        this.$store.commit('set_token', '');
        this.$router.push({ path: '/' });
      }).catch(() => {

      });
    },
    User_Command(command) {
      if (command === 'b') {
        this.goto_logout();
      }
    },
  },
};
</script>

<style scoped>


#top {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  height: 61px;
  margin-bottom: 3px;
}

</style>
