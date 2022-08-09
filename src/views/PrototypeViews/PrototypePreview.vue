<template>
  <div id="main">
    <el-tabs type="border-card" style="width: 100%">
      <el-tab-pane v-for="(proto, i) in all_proto_content" :key="i" :name="proto.proto_id + ''">
        <span slot="label"> <span class="el-icon-document"></span> {{ proto.proto_name }} </span>

        <div>
          <div id="preview-area" :style="'width:' + proto.canvas_width + 'px;'">
            <div
              id="drag-area"
              ref="screenshotArea"
              :style="'width:' + proto.canvas_width + 'px;height:' + proto.canvas_height + 'px;'"
            >
              <VueDragResize
                v-for="element in proto.protos_content"
                :key="element.id"

                :preventActiveBehavior="true"
                :x="element.x"
                :y="element.y"
                :z="element.z"
                :w="element.width"
                :h="element.height"
                :isActive="false"
              >
                <div style="height: 100%; display: flex; align-items: center">
                  <div
                    v-if="element.inner_text === false"
                    :style="'white-space: nowrap; margin-right: 5px; font-size:' + element.font_size + 'px;'"
                  >
                    {{ element.text }}
                  </div>
                  <component
                    :is="element.tag"
                    v-bind="element.props"
                    v-model="element.self_model"
                    :style="'width: 100%; height: 100%; font-size:' + element.font_size + 'px;' + element.advanced_style"
                  >
                    <component
                      v-for="(child_prop, j) in element.child_props"
                      :key="j"
                      :is="element.child_tag"
                      v-bind="child_prop"
                    ></component>
                    {{ element.text }}
                  </component>
                </div>
              </VueDragResize>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import qs from 'qs';
  import VueDragResize from 'vue-drag-resize';

  export default {
    name: 'PrototypePreview',
    components: { VueDragResize },

    data() {
      return {
        // [{proto_id, proto_name, canvas_width, canvas_height, protos_content}, ...]
        all_proto_content: [],
      };
    },

    methods: {
      get_prototype() {
        this.$axios
          .post('/project/view_proto_preview', qs.stringify({ proj_id: this.$route.query.id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.all_proto_content = res.data.all_proto_content;
              let len = this.all_proto_content.length;
              for (let i = 0; i < len; i++) {
                // 弱类型就是方便
                this.all_proto_content[i].protos_content = JSON.parse(
                  this.all_proto_content[i].protos_content
                );
              }
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
      this.get_prototype();
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
  #main {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
  }

  #preview-area {
    position: relative;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
  }

  #left {
    width: 100px;
    height: 100%;
    text-align: left;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.12), 8px 8px 8px rgba(0, 0, 0, 0.04);
  }

  #right {
    width: 100%;
    height: 100%;
  }
</style>
