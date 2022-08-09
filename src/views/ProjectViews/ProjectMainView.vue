<template>
  <div style="width: 100%; height: 100%;">
    <div id="title">
      <router-link :to="{ path: '/team', query: { id: this.proj_team_id } }">
        <el-link :underline="false" id="back-arrow">
          <span class="el-icon-arrow-left back-arrow"></span>
        </el-link>
      </router-link>
      <span>{{ proj_name }}</span>
    </div>
    <el-tabs v-model="current_tab_name" @tab-click="tab_change">
      <el-tab-pane label="项目信息" name="info"><ProjectInfoView /></el-tab-pane>
      <el-tab-pane label="原型设计" name="prototype"><PrototypeMainView /></el-tab-pane>
      <el-tab-pane label="UML图" name="uml"><UMLView /></el-tab-pane>
      <el-tab-pane label="共享文档" name="file"><FileView /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import qs from 'qs';

  import ProjectInfoView from '@/views/ProjectViews/ProjectInfoView.vue';
  import PrototypeMainView from '@/views/ProjectViews/PrototypeMainView.vue';
  import FileView from '@/views/ProjectViews/FileView.vue';
  import UMLView from '@/views/UMLView.vue';

  export default {
    name: 'ProjectView',
    components: { ProjectInfoView, PrototypeMainView, FileView, UMLView },

    data() {
      return {
        current_tab_name: 'info',
        proj_name: '',
        proj_team_id: 0,
      };
    },

    methods: {
      tab_change() {
        this.$router.push({ query: { ...this.$route.query, tab: this.current_tab_name, teamid: this.proj_team_id } });
        window.location.reload();
      },

      get_proj_info() {
        this.$axios
          .post('/project/detail', qs.stringify({ proj_id: this.$route.query.id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.proj_name = res.data.proj_name;
              this.proj_team_id = res.data.proj_team_id;

              let recent_info = {
                proj_id: this.$route.query.id,
                proj_name: res.data.proj_name,
                team_name: res.data.proj_team,
              };
              this.$store.commit('push_recent_proj', recent_info);
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
      if ('tab' in this.$route.query) {
        this.current_tab_name = this.$route.query.tab;
      } else {
        this.current_tab_name = 'info';
      }
      this.get_proj_info();
    },

    watch: {
      $route(to, from) {
        if (to.query.id !== from.query.id) {
          this.id = to.query.id;
          this.get_proj_info();
        }
      },
    },
  };
</script>

<style scoped>
  #title {
    width: 100%;
    height: 60px;
    padding-top: 10px;
    text-align: left;
    font-size: 35px;
    font-weight: bold;
  }

  #back-arrow {
    font-size: 30px;
  }
</style>
