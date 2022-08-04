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

    <div style="width: 500px">
      <div id="drag-area" ref="screenshotArea" @mousedown="unset_active()">
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
              :is="element.tag"
              class="drag-element"
              :style="'height: 100%; font-size:' + element.font_size + 'px;'"
            >
              {{ element.text }}
            </component>
          </div>
        </VueDragResize>
      </div>
    </div>

    <div id="right-area">
      <div id="button-area" style="text-align: left">
        <el-button type="success" @click="save_prototype()">保存原型</el-button>
        <el-button type="primary" @click="download_screenshot_prompt()">下载原型为图片</el-button>
      </div>

      <div id="info-area" v-if="activated_index >= 0">
        <div class="title">详细信息</div>
        <div style="text-align: left">
          <div>
            {{ drag_elements[activated_index].name }}
            ({{ drag_elements[activated_index].x }}, {{ drag_elements[activated_index].y }})
          </div>
          <div>
            width: {{ drag_elements[activated_index].width }} height:
            {{ drag_elements[activated_index].height }}
          </div>
          <div>
            显示文字：
            <el-input v-model="drag_elements[activated_index].text"></el-input>
          </div>
          <div>
            字体大小：
            <el-input-number
              v-model="drag_elements[activated_index].font_size"
              :min="12"
              :max="64"
            ></el-input-number>
          </div>
          <el-button type="danger" icon="el-icon-delete" @click="delete_activated()" circle></el-button>
          <el-button type="primary" icon="el-icon-top" @click="drag_elements[activated_index].z++;" circle></el-button>
          <el-button type="primary" icon="el-icon-bottom" @click="drag_elements[activated_index].z++;" circle></el-button>
        </div>
      </div>
    </div>

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
  export default {
    name: 'PrototypeView',
    components: { VueDragResize },

    data() {
      return {
        id: 0, // 只是为了 v-for 的 key，没有实际意义

        activated_index: -1,

        toolbar_items: [
          { name: '按钮', tag: 'el-button', width: 90, height: 40, text: '按钮', inner_text: true },
          { name: '文本', tag: 'div', width: 70, height: 20, text: '文本', inner_text: true },
          { name: '输入框', tag: 'el-input', width: 150, height: 40, text: '', inner_text: false },
          { name: '单选框', tag: 'el-radio', width: 70, height: 20, text: '单选框', inner_text: true },
          { name: '多选框', tag: 'el-checkbox', width: 70, height: 20, text: '多选框', inner_text: true },
          { name: '开关', tag: 'el-switch', width: 50, height: 30, text: '', inner_text: false },
          { name: '滑块', tag: 'el-slider', width: 150, height: 40, text: '', inner_text: false },
          { name: '评分', tag: 'el-rate', width: 140, height: 20, text: '', inner_text: false },
          { name: '卡片', tag: 'el-card', width: 200, height: 200, text: '卡片', inner_text: true },
        ],

        drag_elements: [], // 参考 add_element

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
          active: false,
          x: 10,
          y: 10,
          z: 0,
          width: item.width,
          height: item.height,
          font_size: 15,
          text: item.text,
          inner_text: item.inner_text,
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

      save_prototype() {
        let post_data = {
          proto_id: this.$route.query.id,
          proto_content: JSON.stringify(this.drag_elements),
        };

        console.log(post_data);

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

        let post_dat = {
          proto_id: this.$route.query.id,
          base64_photo: b64,
        };

        this.$axios
          .post('/project/upload_proto_photo', qs.stringify(post_dat), {
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
        this.save_image_dialog_visible = true;
      },

      download_screenshot() {
        if (this.save_image_filename_noext.trim() === '') {
          this.$message.error('请输入文件名');
          return;
        }

        return html2canvas(this.$refs.screenshotArea, {
          dpi: 192,
          scale: 2,
          useCORS: true,
        }).then((canvas) => {
          var link = document.createElement('a');
          link.download = this.save_image_filename_noext.trim() + '.' + this.save_image_ext;

          if (this.save_image_ext === 'png') {
            link.href = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height).src;
          } else if (this.save_image_ext === 'jpg') {
            link.href = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height).src;
          }

          link.click();
        });
      },

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
              // res.data.proto_content 在后端具有默认值 '[]'
              this.drag_elements = JSON.parse(res.data.proto_content);
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
    margin: 0px;
  }

  #drag-area {
    position: absolute;
    width: 500px;
    height: 100%;
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

  #info-area {
    width: 100%;
    line-height: 60px;
  }

  #info-area > div > div > .el-input {
    width: 60%;
  }
</style>
