<template>
  <div id="main">
    <div id="right">
      <el-divider>原型页面</el-divider>

      <div id="prototypes">
        <div class="one-prototype" v-for="(proto, i) in prototype_list" :key="i">
          <div style="height: 70%">
            <div @click="prototype_click(proto.proto_id)">
              <img :src="proto.proto_photo" style="width: 100%; height: 90px; border-radius: 20px" />
            </div>
          </div>

          <div style="height: 30%; margin-left: 10px">
            <span>
              <span @click="prototype_click(proto.proto_id)">
                <el-link class="proto-title">{{ proto.proto_name }}</el-link>
              </span>
            </span>

            <span style="text-align: right; float: right; margin-right: 10px; margin-top: 10px">
              <el-dropdown>
                <i class="el-icon-more" style="font-size: 18px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item style="color: red">
                    <div @click="delete_prototype(proto.proto_id)">删除页面</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </div>

        <div class="new-prototype">
          <div @click="new_prototype_dialog_visible = true">
            <i class="el-icon-plus" style="font-size: 50px"></i>
            <div style="font-size: 18px; color: gray">新建页面</div>
          </div>
        </div>
      </div>

      <el-divider>原型预览</el-divider>

      <div id="preview">
        <div v-if="preview_status === 0">
          无原型预览
          <el-button type="primary" @click="open_preview_status()">创建预览</el-button>
        </div>
        <div v-else-if="preview_status === 1">
          原型预览已关闭，点击重新开放：
          <span>
            <el-input v-model="preview_link" readonly="true" disabled style="width: 400px; font-size: 15px">
            </el-input>
          </span>
          <span style="margin-left: 15px">
            <el-button type="success" @click="open_preview_status()">开放预览</el-button>
          </span>
        </div>
        <div v-else-if="preview_status === 2">
          原型预览已开放，预览链接：
          <span>
            <el-input v-model="preview_link" readonly="true" style="width: 400px; font-size: 15px">
              <el-button slot="append" icon="el-icon-copy-document" @click="copy_preview_link()"
                >复制</el-button
              >
            </el-input>
          </span>
          <span style="margin-left: 15px">
            <el-button type="danger" @click="close_preview_status()">关闭预览</el-button>
          </span>
        </div>
      </div>
    </div>

    <!-- new proj prompt dialog -->
    <el-dialog title="新建页面" :visible.sync="new_prototype_dialog_visible" width="60%">
      <div class="title">新页面名称</div>
      <br />

      <div style="margin-left: 10%; margin-right: 10%">
        <el-input
          placeholder="请输入新建页面名"
          prefix-icon="el-icon-notebook-2"
          v-model="new_prototype_name"
        >
        </el-input>
      </div>

      <el-divider></el-divider>

      <div class="title">从模板新建页面</div>
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="手机">
          <el-radio-group
            v-model="template_radio_model"
            class="template-prototypes"
            @change="set_template('phone', $event)"
          >
            <el-radio :label="-1">
              <div class="one-template-prototype" style="width: 120px; height: 180px"></div>
              <div style="font-size: 18px">不使用模板</div>
            </el-radio>
            <el-radio v-for="(template, i) in prototype_template_phone.templates" :key="i" :label="i">
              <div>
                <img
                  class="one-template-prototype"
                  :src="template.image"
                  style="width: 120px; height: 180px"
                />
              </div>
              <div style="font-size: 18px">{{ template.name }}</div>
            </el-radio>
          </el-radio-group>
        </el-tab-pane>

        <el-tab-pane label="电脑">
          <el-radio-group
            v-model="template_radio_model"
            class="template-prototypes"
            @change="set_template('pc', $event)"
          >
            <el-radio :label="-1">
              <div class="one-template-prototype" style="width: 315px; height: 180px"></div>
              <div style="font-size: 18px">不使用模板</div>
            </el-radio>
            <el-radio v-for="(template, i) in prototype_template_pc.templates" :key="i" :label="i">
              <div>
                <img
                  class="one-template-prototype"
                  :src="template.image"
                  style="width: 315px; height: 180px"
                />
              </div>
              <div style="font-size: 18px">{{ template.name }}</div>
            </el-radio>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer">
        <el-button @click="new_prototype_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="create_prototype">确定</el-button>
      </div>
    </el-dialog>

    <!--rename prototype prompt dialog -->
    <el-dialog title="重命名页面" :visible.sync="prototype_rename_dialog_visible" width="40%">
      <div style="margin-left: 10%; margin-right: 10%">
        <el-input placeholder="请输入新名字" prefix-icon="el-icon-notebook-2" v-model="prototype_rename">
        </el-input>
      </div>
      <div slot="footer">
        <el-button @click="prototype_rename_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="rename_prototype">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs';

  import {
    prototype_template_phone,
    prototype_template_pc,
  } from '@/views/PrototypeViews/PrototypeTemplate.js';

  export default {
    name: 'PrototypeListView',
    props: ['projid'],
    data() {
      return {
        new_prototype_dialog_visible: false, //控制新建原型图对话框的显示
        new_prototype_name: '', //新建原型图名
        prototype_rename_dialog_visible: false, //控制重命名原型图对话框的显示
        prototype_rename_id: 0, //重命名原型图的id
        prototype_rename: '',
        prototype_list: [], //原型图列表

        preview_status: -1, // 0 无, 1 关闭, 2 打开
        preview_link: '',

        // imported from js
        prototype_template_phone,
        prototype_template_pc,

        current_template: {
          canvas_width: 500,
          canvas_height: 500,
          content: '[]',
        },
        template_radio_model: -1,
      };
    },
    methods: {
      // 通知父控件
      prototype_click(prototype_id) {
        this.$emit('proto-change', prototype_id);
      },

      set_template(type, index) {
        let template_type;
        if (type === 'phone') {
          template_type = prototype_template_phone;
        } else if (type === 'pc') {
          template_type = prototype_template_pc;
        }

        this.current_template.canvas_width = template_type.canvas_width;
        this.current_template.canvas_height = template_type.canvas_height;
        if (index >= 0) {
          this.current_template.content = template_type.templates[index].content;
        } else {
          // no template, index=-1
          this.current_template.content = '[]';
        }
      },

      rename_prototype() {
        console.log(this.prototype_rename_id);
        if (this.prototype_rename === '') {
          this.$message.error('原型图名不能为空');
        } else {
          this.$axios
            .post(
              '/project/rename_proto',
              qs.stringify({ proto_id: this.prototype_rename_id, new_name: this.prototype_rename }),
              {
                headers: {
                  userid: this.$store.state.userid,
                  token: this.$store.state.token,
                },
              }
            )
            .then((res) => {
              if (res.data.errno === 0) {
                console.log(res.data); //测试一下
                this.$message.success('重命名成功');
                this.prototype_rename_dialog_visible = false;
                for (var item of this.prototype_list) {
                  if (item.proto_id === this.prototype_rename_id) {
                    item.proto_name = this.prototype_rename;
                  }
                }
                //console.log(this.prototype_list);
                this.prototype_rename = ''; //争取把源数据(文档名)也修改了
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      },

      delete_prototype(prototype_id) {
        this.$confirm('是否删除原型？', '删除原型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$axios
            .post('/project/delete_proto', qs.stringify({ proto_id: prototype_id }), {
              headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
              },
            })
            .then((res) => {
              if (res.data.errno === 0) {
                var i = 0;
                for (var item of this.prototype_list) {
                  if (item.proto_id === prototype_id) {
                    break;
                  } else {
                    i++;
                  }
                }
                this.prototype_list.splice(i, 1);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
          //this.$message.success('成功删除文档' + file_id);
        });
      },

      create_prototype() {
        if (this.new_prototype_name === '') {
          this.$message.error('原型名不能为空');
        } else {
          let post_data = {
            proj_id: this.projid,
            proto_name: this.new_prototype_name,
            canvas_width: this.current_template.canvas_width,
            canvas_height: this.current_template.canvas_height,
            proto_content: this.current_template.content,
          };

          this.$axios
            .post('/project/create_proto', qs.stringify(post_data), {
              headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
              },
            })
            .then((res) => {
              if (res.data.errno === 0) {
                console.log(res.data); //测试一下
                this.$message.success('新建原型图成功');
                let pid = res.data.proto_id;
                let item = {
                  proto_id: pid,
                  proto_name: this.new_prototype_name,
                  creator_id: this.$store.state.userid,
                  creator_name: this.$store.state.username,
                  creator_truename: this.$store.state.user_truename,
                };
                this.prototype_list.push(item);
                this.new_prototype_dialog_visible = false;
                this.new_prototype_name = ''; //争取把源数据(原型名)也修改了
                this.$router.go(0);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      },

      get_prototype_list() {
        this.$axios
          .post('/project/proj_proto', qs.stringify({ proj_id: this.projid }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              // console.log(res.data); //测试一下
              //this.$message.success('重命名成功' + this.file_rename_id);
              this.prototype_list = res.data.protos_info; //争取把源数据(文档名)也修改了
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      get_preview_status() {
        this.$axios
          .post('/project/view_preview_status', qs.stringify({ proj_id: this.projid }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.preview_status = res.data.preview_status;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      open_preview_status() {
        this.preview_status = 2;
        this.change_preview_status(true);
        this.$message.success('预览已开启');
      },

      close_preview_status() {
        this.preview_status = 1;
        this.change_preview_status(false);
        this.$message.success('预览已关闭');
      },

      change_preview_status(open) {
        let url = open ? '/project/open_proto_preview' : '/project/close_proto_preview';
        this.$axios
          .post(url, qs.stringify({ proj_id: this.projid }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              // this.preview_status = res.data.preview_status;
              // this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      copy_preview_link() {
        navigator.clipboard.writeText(this.preview_link).then(() => {
          this.$message.success('复制成功');
        });
      },
    },

    created() {
      this.get_prototype_list();
      this.get_preview_status();
      this.preview_link = location.origin + '/#/protopreview?id=' + this.projid;
    },
  };
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #left {
    width: 350px;
    height: 100%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
  }

  #right {
    width: 100%;
    height: 100%;
    padding-left: 20px;
  }

  .title {
    width: 100%;
    padding-top: 10px;
    text-align: left;
    font-size: 25px;
  }

  #prototypes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
    min-height: 200px;
  }

  .proto-title {
    font-size: 25px;
    color: #333;
    font-weight: bold;
  }

  .one-prototype {
    width: 250px;
    height: 150px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .new-prototype {
    width: 100px;
    height: 150px;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
  }

  .template-prototypes {
    overflow-y: auto;
    height: 100%;
    padding: 15px;
    display: flex;
  }

  .one-template-prototype {
    margin: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    text-align: left;
  }

  #preview {
    width: 100%;
    text-align: left;
    padding-left: 25px;
  }

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
