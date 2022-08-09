<template>
  
    <el-tabs id="main" v-model="current_proto_id" tab-position="left">
      <el-tab-pane name="proto_list">
        <span slot="label"><b>组织页面</b></span>
        <PrototypeList :projid="this.$route.query.id" @proto-change="handle_proto_change" />
      </el-tab-pane>

      <el-tab-pane v-for="(proto, i) in proto_list" :key="i" :name="proto.proto_id + ''">
        <span slot="label"> <span class="el-icon-document"></span> {{ proto.proto_name }} </span>
        <PrototypeEdit :protoid="proto.proto_id" />
      </el-tab-pane>
    </el-tabs>
  
</template>

<script>
  import qs from 'qs';
  import PrototypeList from '@/views/PrototypeViews/PrototypeList.vue';
  import PrototypeEdit from '@/views/PrototypeViews/PrototypeEdit.vue';

  export default {
    name: 'PrototypeMainView',
    components: { PrototypeList, PrototypeEdit },

    data() {
      return {
        proto_list: [],
        current_proto_id: 'proto_list',
      };
    },

    methods: {
      handle_select(index) {
        this.current_proto_id = index;
      },

      handle_proto_change(proto_id) {
        this.current_proto_id = proto_id + '';
      },

      get_proto_list() {
        this.$axios
          .post('/project/proj_proto', qs.stringify({ proj_id: this.$route.query.id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.proto_list = res.data.protos_info;
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
      this.get_proto_list();
    },
  };
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
  }

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
