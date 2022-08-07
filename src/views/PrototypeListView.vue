<template>
  <div id="prototype">
    <div id="title">原型编辑</div>

    <div id="prototypes">
      <div v-for="(proto, i) in prototype_list" :key="i" class="one-prototype">
        <div style="height: 70%">
          <!-- <div style="background-color: gray;"></div> -->
          <router-link :to="{ path: '/prototype', query: { id: proto.proto_id } }">
            <img style="width: 100%; height: 100%; border-radius: 20px" src="@/assets/logo.png" />
          </router-link>
        </div>

        <div style="height: 30%; margin-left: 10px">
          <span>
            <router-link :to="{ path: '/prototype', query: { id: proto.proto_id } }">
              <el-link class="proto-title">{{ proto.proto_name }}</el-link>
            </router-link>
          </span>

          <span style="text-align: right; float: right; margin-right: 10px; margin-top: 10px">
            <el-dropdown>
              <i class="el-icon-more" style="font-size: 18px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="edit_prototype(proto.proto_id)">编辑原型</div>
                </el-dropdown-item>
                <el-dropdown-item style="color: red">
                  <div @click="delete_prototype(proto.proto_id)">删除原型</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>

      <div class="new-prototype">
        <div @click="new_prototype_dialog_visible = true">
          <i class="el-icon-plus" style="font-size: 50px"></i>
          <div style="font-size: 18px; color: gray">新建原型</div>
        </div>
      </div>
    </div>

    <!-- new proj prompt dialog -->
    <el-dialog title="新建原型" :visible.sync="new_prototype_dialog_visible" width="40%">
      <div style="margin-left: 10%; margin-right: 10%">
        <el-input
          placeholder="请输入新建原型名"
          prefix-icon="el-icon-notebook-2"
          v-model="new_prototype_name"
        >
        </el-input>
      </div>
      <div slot="footer">
        <el-button @click="new_prototype_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="create_prototype">确定</el-button>
      </div>
    </el-dialog>

    <!--rename prototype prompt dialog -->
    <el-dialog title="重命名原型" :visible.sync="prototype_rename_dialog_visible" width="40%">
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
  export default {
    name: 'PrototypeListView',
    data() {
      return {
        new_prototype_dialog_visible: false, //控制新建原型图对话框的显示
        new_prototype_name: '', //新建原型图名
        prototype_rename_dialog_visible: false, //控制重命名原型图对话框的显示
        prototype_rename_id: 0, //重命名原型图的id
        prototype_rename: '',
        prototype_list: [], //原型图列表
      };
    },
    methods: {
      edit_prototype(prototype_id) {
        console.log(prototype_id);
        this.$router.push({ path: '/prototype', query: { id: prototype_id } }); //跳转到该文档的编辑界面
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
                console.log(res.data); //测试一下
                //this.$message.success('重命名成功' + this.prototype_rename_id);
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
          this.$axios
            .post(
              '/project/create_proto',
              qs.stringify({ proj_id: this.$route.query.id, proto_name: this.new_prototype_name }),
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
    },
    mounted() {
      this.$axios
        .post('/project/proj_proto', qs.stringify({ proj_id: this.$route.query.id }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          },
        })
        .then((res) => {
          if (res.data.errno === 0) {
            console.log(res.data); //测试一下
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
  };
</script>

<style scoped>
  #prototype {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  #title {
    width: 100%;
    padding-top: 10px;
    text-align: left;
    font-size: 30px;
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

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
