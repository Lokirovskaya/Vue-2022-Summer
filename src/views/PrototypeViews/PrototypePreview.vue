<template>
  <div id="main">
    <div>
      <div id="preview-area" :style="'width:' + canvas_width + 'px;'">
        <div
          id="drag-area"
          ref="screenshotArea"
          :style="'width:' + canvas_width + 'px;height:' + canvas_height + 'px;'"
          @mousedown="unset_active()"
        >
          <VueDragResize
            v-for="(element, i) in drag_elements"
            :key="element.id"
            :parentLimitation="true"
            :x="element.x"
            :y="element.y"
            :z="element.z"
            :w="element.width"
            :h="element.height"
            :isActive="element.active"
            :minw="20"
            :minh="20"
            :snapToGrid="true"
            :gridX="10"
            :gridY="10"
            @activated="set_active(i)"
            @dragging="set_position($event, i)"
            @resizing="set_size($event, i)"
          >
            <div style="height: 100%; display: flex; align-items: center">
              <div
                v-if="element.inner_text === false"
                :style="'white-space: nowrap; margin-right: 5px; font-size:' + element.font_size + 'px;'"
              >
                {{ element.text }}
              </div>
              <component
                class="drag-element"
                :is="element.tag"
                v-bind="element.props"
                v-model="element.self_model"
                :style="'height: 100%; font-size:' + element.font_size + 'px;'"
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
        drag_element: [],
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
              console.log(this.all_proto_content)
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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #preview-area {
    position: relative;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
  }
</style>
