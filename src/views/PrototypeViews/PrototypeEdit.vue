<template>
  <div id="main">
    <div id="toolbar">
      <!-- <el-button icon="el-icon-arrow-left">返回</el-button> -->
      <!-- <el-divider></el-divider> -->
      <div class="title">工具栏</div>
      <el-button
        v-for="item in toolbar_items"
        :key="item.tag"
        @click="add_element(item)"
        class="toolbar-item"
      >
        {{ item.name }}
      </el-button>
    </div>

    <div id="work-area">
      <div :style="'width:' + canvas_width + 'px;'" :key="canvas_key">
        <div
          id="drag-area"
          ref="screenshotArea"
          :style="
            'width:' +
            canvas_width +
            'px;height:' +
            canvas_height +
            'px; transform: scale(' +
            canvas_scale +
            ');'
          "
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

    <div id="right-area">
      <div id="button-area" style="text-align: left">
        <el-button type="success" @click="save_prototype()">保存原型</el-button>
        <el-button type="primary" @click="download_screenshot_prompt()">下载原型为图片</el-button>
      </div>
      <div>
        页面大小：

        <span>
          宽<el-input-number
            v-model="canvas_width"
            :controls="false"
            :min="100"
            :max="1500"
            @change="update_canvas_size()"
            class="canvas-size-input"
          ></el-input-number>
        </span>
        <span>
          高<el-input-number
            v-model="canvas_height"
            :controls="false"
            :min="100"
            :max="2000"
            @change="update_canvas_size()"
            class="canvas-size-input"
          ></el-input-number
        ></span>
      </div>

      <!-- <el-divider></el-divider> -->

      <div id="info-area" v-if="activated_index >= 0">
        <GeneralToolBar
          :ActiveElement="drag_elements[activated_index]"
          @delete-clicked="delete_activated()"
        />
        <component
          :is="drag_elements[activated_index].tool"
          :ActiveElement="drag_elements[activated_index]"
        ></component>
      </div>
    </div>

    <!-- debug -->
    <!-- <div style="width: 300px">{{ drag_elements }}</div> -->

    <!-- save-image-dialog -->
    <el-dialog title="下载原型为图片" :visible.sync="save_image_dialog_visible" width="40%">
      <div>
        <el-radio v-model="save_image_ext" label="png">png</el-radio>
        <el-radio v-model="save_image_ext" label="jpg">jpg</el-radio>
      </div>
      <br />
      <div>
        <el-input v-model="save_image_filename_noext" placeholder="请输入文件名">
          <template slot="append">.{{ save_image_ext }}</template>
        </el-input>
      </div>

      <div slot="footer">
        <el-button @click="save_image_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="download_screenshot()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs';
  import VueDragResize from 'vue-drag-resize';
  import html2canvas from 'html2canvas';
  import Canvas2Image from '@/assets/canvas2image.js';

  import toolbar_items from '@/views/PrototypeViews/ToolBarItems.js';
  import GeneralToolBar from '@/views/PrototypeViews/ToolBars/GeneralToolBar.vue';
  import ButtonToolBar from '@/views/PrototypeViews/ToolBars/ButtonToolBar.vue';
  import InputToolBar from '@/views/PrototypeViews/ToolBars/InputToolBar.vue';
  import RadioToolBar from '@/views/PrototypeViews/ToolBars/RadioToolBar.vue';
  import SelectToolBar from '@/views/PrototypeViews/ToolBars/SelectToolBar.vue';

  export default {
    name: 'PrototypeView',
    props: ['protoid'],
    components: {
      VueDragResize,
      GeneralToolBar,
      ButtonToolBar,
      InputToolBar,
      RadioToolBar,
      SelectToolBar,
    },

    data() {
      return {
        id: 0, // 只是为了 v-for 的 key，没有实际意义

        activated_index: -1,

        toolbar_items, // import from js

        drag_elements: [], // 参考 add_element

        canvas_width: 500,
        canvas_height: 600,
        canvas_key: 0, // 为了刷新 canvas 设置的 key
        canvas_scale: 1,

        save_image_dialog_visible: false,
        save_image_ext: 'png',
        save_image_filename_noext: '',
      };
    },

    methods: {
      add_element(item) {
        let element = {
          id: this.id,
          name: item.name,
          tag: item.tag,
          tool: item.tool,
          active: false,
          x: 10,
          y: 10,
          z: 500,
          width: item.width,
          height: item.height,
          font_size: 15,
          text: item.text,
          inner_text: item.inner_text,
          props: item.props,
          self_model: '',
          child_tag: item.child_tag,
          child_props: item.child_props,
        };
        this.drag_elements.push(element);
        this.id++;
      },

      set_active(index) {
        if (this.activated_index >= 0) {
          this.drag_elements[this.activated_index].active = false;
        }

        this.drag_elements[index].active = true;

        this.activated_index = index;
      },

      unset_active() {
        if (this.activated_index >= 0) {
          this.drag_elements[this.activated_index].active = false;
        }
        this.activated_index = -1;
      },

      set_position(new_element, index) {
        this.drag_elements[index].x = new_element.left;
        this.drag_elements[index].y = new_element.top;
      },

      set_size(new_element, index) {
        this.drag_elements[index].width = new_element.width;
        this.drag_elements[index].height = new_element.height;
      },

      delete_activated() {
        if (this.activated_index >= 0) {
          this.drag_elements.splice(this.activated_index, 1);
        }
        this.activated_index = -1;
      },

      update_canvas_size() {
        this.canvas_key++;
      },

      save_prototype() {
        let post_data = {
          proto_id: this.protoid,
          canvas_width: this.canvas_width,
          canvas_height: this.canvas_height,
          proto_content: JSON.stringify(this.drag_elements),
        };

        this.$axios
          .post('project/upload_proto', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('原型提交成功');
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });

        this.upload_screenshot();
      },

      async upload_screenshot() {
        const canvas = await html2canvas(this.$refs.screenshotArea, {
          // dpi: 192,
          useCORS: true,
        });

        let b64 = canvas.toDataURL('image/png');

        let post_data = {
          proto_id: this.protoid,
          base64_photo: b64,
        };

        this.$axios
          .post('/project/upload_proto_photo', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('原型图片上传成功');
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      download_screenshot_prompt() {
        this.unset_active();
        this.save_image_dialog_visible = true;
      },

      async download_screenshot() {
        if (this.save_image_filename_noext.trim() === '') {
          this.$message.error('请输入文件名');
          return;
        }

        const canvas = await html2canvas(this.$refs.screenshotArea, {
          dpi: 192,
          scale: 2,
          useCORS: true,
        });

        var link = document.createElement('a');
        link.download = this.save_image_filename_noext.trim() + '.' + this.save_image_ext;
        if (this.save_image_ext === 'png') {
          link.href = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height).src;
        } else if (this.save_image_ext === 'jpg') {
          link.href = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height).src;
        }
        link.click();
      },

      get_prototype() {
        this.$axios
          .post('/project/get_proto', qs.stringify({ proto_id: this.protoid }), {
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
  };
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .title {
    text-align: center;
    font-size: 18px;
    height: 40px;
    margin-top: 10px;
  }

  #toolbar {
    width: 150px;
    height: 100%;
  }

  .toolbar-item {
    width: 100%;
    height: 40px;
    border-radius: 0px;
    text-align: left;
    font-size: 16px;
    margin-left: 5px;
  }

  #work-area {
    height: 530px;
    width: 700px;
    background-color: #ddd;
    overflow: scroll;
    padding: 10px;
  }

  #drag-area {
    position: relative;
    /* will set by this.canvas_width/height now */
    /* width: 100%; */
    /* height: 100%; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
  }

  .drag-element {
    width: 100%;
    height: 100%;
  }

  #right-area {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-left: 20px;
    margin-top: 30px;
  }

  #button-area {
    width: 100%;
    height: 60px;
  }

  .canvas-size-input {
    width: 65px;
    margin: 5px;
  }

  #info-area {
    width: 100%;
    line-height: 60px;
  }

  #info-area > div > div > .el-input {
    width: 60%;
  }
</style>
