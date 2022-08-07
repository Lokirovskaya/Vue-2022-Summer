<template>
  <div style="width: 100%; height: 100%">
    <div id="title">
      <!-- todo -->
      <router-link :to="{ path: '/project', query: { id: this.proj_id } }">
        <el-link :underline="false" id="back-arrow">
          <span class="el-icon-arrow-left back-arrow"></span>
        </el-link>
      </router-link>
      <span>原型名称</span>
    </div>
    <el-tabs v-model="current_tab_name" @tab-click="tab_change">
      <el-tab-pane label="原型编辑" name="info"><PrototypeEdit /></el-tab-pane>
      <el-tab-pane label="原型预览" name="prototype"><PrototypePreview /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//   import qs from 'qs';

  import PrototypeEdit from '@/views/PrototypeViews/PrototypeEdit.vue';
  import PrototypePreview from '@/views/PrototypeViews/PrototypePreview.vue';

  export default {
    name: 'ProjectView',
    components: { PrototypeEdit, PrototypePreview },

    data() {
      return {
        current_tab_name: 'info',
        proj_name: '',
        proj_team_id: 0,
      };
    },

    methods: {
      tab_change() {
        this.$router.push({ query: { ...this.$route.query, tab: this.current_tab_name } });
      },

      get_proj_info() {
        
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
