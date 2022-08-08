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
        drag_elements: [],

        canvas_width: 500,
        canvas_height: 600,
      };
    },

    methods: {
      get_prototype() {
        this.$axios
          .post('/project/get_proto', qs.stringify({ proto_id: this.$route.query.id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.canvas_width = res.data.canvas_width;
              this.canvas_height = res.data.canvas_height;
              // res.data.proto_content 在后端具有默认值 '[]'
              this.drag_elements = JSON.parse(res.data.proto_content);
              // 重新编制 id，防止 key 冲突
              let len = this.drag_elements.length;
              for (let i = 0; i < len; i++) {
                this.drag_elements[i].id = i;
              }
              this.id = len;
              console.log(this.drag_elements);
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
