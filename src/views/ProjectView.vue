<template>
  <div style="width: 100%; height: 100%; padding: 20px;">
    <el-tabs  v-model="current_tab_name">
      <el-tab-pane label="项目信息" name="info"><ProjectInfoView /></el-tab-pane>
      <el-tab-pane label="原型设计" name="prototype"><PrototypeListView /></el-tab-pane>
      <el-tab-pane label="UML图" name="uml">todo</el-tab-pane>
      <el-tab-pane label="共享文档" name="file"><FileView /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ProjectInfoView from '@/views/ProjectInfoView.vue';
  import PrototypeListView from '@/views/PrototypeListView.vue';
  import FileView from '@/views/FileView.vue';
  export default {
    name: 'ProjectView',
    components: { ProjectInfoView, PrototypeListView, FileView },
    data() {
      return {
        current_tab_name: 'info',
      };
    },
  };
</script>

