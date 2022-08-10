<template>
  <div id="main">
    <div id="title">{{ team_name }}</div>

    <el-tabs>
      <el-tab-pane label="团队信息">
        <el-divider>团队项目</el-divider>

        <div class="sort_and_search">
          <!-- <div class="all_input">
            <div class="search">
              <input v-model="keyword_input" v-on:input="monitor_input" class="search-input" type="text" placeholder="搜索项目" />
              <el-button class="search_button" @click="click_search()" size="small">搜索</el-button
              >
            </div>
            <div v-if="this.keyword_input != ''">
              <ul v-if="this.keyword_input != ''" class="item-ul">
                <li class="search-item" v-for="item of list" :key="item.projId">
                  <span @click="complete_input(item.projName)" class="one_search_result">{{ item.projName }}</span>
                </li>
              </ul>
            </div>
          </div> -->

          <div style="display: flex; align-items: center">
            <el-button
              icon="el-icon-search"
              @click="start_search"
              class="single_search_bottom"
              size="small"
            ></el-button>
            <el-dropdown trigger="click" size="small">
              <!-- <span class="el-dropdown-link"> -->
              <el-button size="small" plain>
                {{ this.sort_type }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <!-- </span> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><div @click="sort_proj('创建时间从早到晚')">创建时间从早到晚</div></el-dropdown-item
                >
                <el-dropdown-item
                  ><div @click="sort_proj('创建时间从晚到早')">创建时间从晚到早</div></el-dropdown-item
                >
                <el-dropdown-item
                  ><div @click="sort_proj('名称字典序正序')">名称字典序正序</div></el-dropdown-item
                >
                <el-dropdown-item
                  ><div @click="sort_proj('名称字典序倒序')">名称字典序倒序</div></el-dropdown-item
                >
                <el-dropdown-item
                  ><div @click="sort_proj('开始时间从早到晚')">开始时间从早到晚</div></el-dropdown-item
                >
                <el-dropdown-item
                  ><div @click="sort_proj('开始时间从晚到早')">开始时间从晚到早</div></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <br />
        </div>

        <div id="projs">
          <div v-for="(proj, i) in proj_data" :key="i" class="one-proj">
            <div v-if="is_searchORorder === 0" style="height: 60%">
              <!-- <div style="background-color: gray;"></div> -->
              <router-link :to="{ path: '/project', query: { id: proj.proj_id } }">
                <img style="width: 100%; height: 100%; border-radius: 20px" src="@/assets/logo.png" />
              </router-link>
            </div>

            <div v-else style="height: 60%">
              <router-link :to="{ path: '/project', query: { id: proj.projId } }">
                <img style="width: 100%; height: 100%; border-radius: 20px" src="@/assets/logo.png" />
              </router-link>
            </div>

            <div v-if="is_searchORorder === 0" style="height: 30%; margin-left: 10px">
              <router-link :to="{ path: '/project', query: { id: proj.proj_id } }">
                <el-link class="proj-title">{{ proj.proj_name }}</el-link>
              </router-link>
            </div>
            <div v-else style="height: 30%; margin-left: 10px">
              <router-link :to="{ path: '/project', query: { id: proj.projId } }">
                <el-link class="proj-title">{{ proj.projName }}</el-link>
              </router-link>
            </div>

            <div style="height: 30%; margin-left: 10px">
              <!-- <span v-if="is_searchORorder === 0">{{ proj.proj_info }}</span> -->
              <span style="text-align: right; float: right; margin-right: 10px">
                <el-dropdown>
                  <i class="el-icon-more" style="font-size: 18px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div v-if="is_searchORorder === 0" @click="copy_proj(proj.proj_id)">复制项目</div>
                      <div v-else @click="copy_proj(proj.projId)">复制项目</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="edit_proj_prompt(proj)">修改信息</div>
                    </el-dropdown-item>
                    <el-dropdown-item style="color: red">
                      <div v-if="is_searchORorder === 0" @click="delete_proj_prompt(proj.proj_id)">
                        删除项目
                      </div>
                      <div v-else @click="delete_proj_prompt(proj.projId)">删除项目</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>

          <div class="new-proj">
            <div @click="create_proj_prompt()">
              <i class="el-icon-plus" style="font-size: 50px"></i>
              <div style="font-size: 18px; color: gray">新建项目</div>
            </div>
          </div>
        </div>

        <el-divider>团队成员</el-divider>

        <div id="members">
          <div class="one-member" v-for="member in member_data" :key="member.member_id">
            <img :src="'http://stcmp.shlprn.cn' + member.member_photo" class="avatar" />
            <div id="username">{{ member.member_name }}</div>
          </div>

          <div class="one-member">
            <el-button
              @click="invite_member_prompt()"
              class="avatar invite-member"
              style="background-color: #eee"
            >
              <i class="el-icon-plus"></i>
            </el-button>
            <div id="username">邀请新成员</div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="团队管理">
        <div style="width: 95%; text-align: left">
          <div style="font-size: 25px; margin-bottom: 10px"><b>团队操作</b></div>
          <div>
            <el-button type="danger" @click="delete_team_prompt()">解散团队</el-button>
          </div>
          <br />
          <br />
          <div style="font-size: 25px; margin-bottom: 10px"><b>项目回收站</b></div>
          <div>
            <TrashBin :teamid="team_id"></TrashBin>
          </div>
          <br />
          <br />
          <div style="font-size: 25px; margin-bottom: 10px"><b>成员管理</b></div>
          <div>
            <TeamManagement :teamid="team_id"></TeamManagement>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="文档中心">
        <!-- <router-link :to="{ path: '/doccenter', query: { id: team_id } }"> -->
          <!-- <el-button type="primary">文档中心</el-button> -->
          <DocCenter></DocCenter>
        <!-- </router-link> -->
      </el-tab-pane>
    </el-tabs>

    <!-- new proj prompt dialog -->
    <el-dialog title="新建项目" :visible.sync="new_proj_dialog_visible" width="40%">
      <el-form :model="new_proj_dialog_data" :rules="proj_dialog_form_rule">
        <el-form-item label="项目名称" :label-width="dialog_label_width" prop="proj_name">
          <el-input v-model="new_proj_dialog_data.proj_name"></el-input>
        </el-form-item>
        <el-form-item label="项目简介" :label-width="dialog_label_width">
          <el-input v-model="new_proj_dialog_data.proj_info"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" :label-width="dialog_label_width" prop="start_time">
          <el-date-picker
            v-model="new_proj_dialog_data.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%; position: relative; bottom: -5px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目结束时间" :label-width="dialog_label_width" prop="end_time">
          <el-date-picker
            v-model="new_proj_dialog_data.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%; position: relative; bottom: -5px"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="new_proj_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="create_proj()">确定</el-button>
      </div>
    </el-dialog>

    <!-- edit proj prompt dialog -->
    <el-dialog title="新建项目" :visible.sync="edit_proj_dialog_visible" width="40%">
      <el-form :model="edit_proj_dialog_data" :rules="proj_dialog_form_rule">
        <el-form-item label="项目名称" :label-width="dialog_label_width" prop="proj_name">
          <el-input v-model="edit_proj_dialog_data.proj_name"></el-input>
        </el-form-item>
        <el-form-item label="项目简介" :label-width="dialog_label_width">
          <el-input v-model="edit_proj_dialog_data.proj_info"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" :label-width="dialog_label_width" prop="start_time">
          <el-date-picker
            v-model="edit_proj_dialog_data.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%; position: relative; bottom: -5px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目结束时间" :label-width="dialog_label_width" prop="end_time">
          <el-date-picker
            v-model="edit_proj_dialog_data.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%; position: relative; bottom: -5px"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="edit_proj_dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="edit_proj()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="搜索项目" :visible.sync="search_dialogVisible" width="25%">
      <div class="search_dialog">
        <!-- <el-form-item label="项目名称" :label-width="500" required> -->
        <!-- <el-input placeholder="输入项目名" v-model="keyword_input" class="search_proj_input" maxlength="15"></el-input> -->
        <div class="col1">
          <el-col :span="12" class="col">
            <input
              v-model="keyword_input"
              v-on:input="monitor_input"
              class="search-input"
              type="text"
              placeholder="输入项目名称"
            />
            <div v-if="this.keyword_input != ''">
              <ul v-if="this.keyword_input != ''" class="item-ul">
                <li class="search-item" v-for="item of list" :key="item.projId">
                  <!-- <div @click="complete_input(item.projName)">{{ item.projName }}</div> -->
                  <span @click="complete_input(item.projName)" class="one_search_result">{{
                    item.projName
                  }}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </div>
        <!-- </el-form-item> -->

        <el-button @click="search_dialogVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="click_search()" size="small">搜索</el-button>
        <!-- <el-button icon="el-icon-search" circle class="bottom2"></el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs';
  import TeamManagement from '@/views/TeamManagement.vue';
  import TrashBin from '@/views/ProjectTrashBin.vue';
  import DocCenter from '@/views/DocCenterView.vue';
  // import EditView from '@/views/FileEditView.vue';
  export default {
    name: 'TeamView',
    components: { TeamManagement, TrashBin, DocCenter},

    data() {
      return {
        team_id: 0,
        team_name: '',

        dialog_label_width: '120px',

        new_proj_dialog_visible: false,
        new_proj_dialog_data: {
          proj_name: '',
          team_id: 0, // 发送前记得改为 this.team_id
          proj_info: '',
          start_time: '',
          end_time: '',
        },

        edit_proj_dialog_visible: false,
        edit_proj_dialog_data: {
          proj_id: 0,
          proj_name: '',
          proj_info: '',
          start_time: '',
          end_time: '',
        },
        editing_proj_id: 0,

        proj_dialog_form_rule: {
          proj_name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          start_time: [{ type: 'date', required: true, message: '日期不能为空', trigger: 'blur' }],
          end_time: [{ type: 'date', required: true, message: '日期不能为空', trigger: 'blur' }],
        },

        proj_data: [], // proj_id, proj_name, proj_photo
        member_data: [], // member_id, member_name, member_photo

        list: [],
        list_new: [],
        timer: '',
        keyword_input: '',

        is_searchORorder: 0,
        search_dialogVisible: false,

        sort_type: '排序方式',
      };
    },

    methods: {
      create_proj_prompt() {
        this.new_proj_dialog_visible = true;
      },

      create_proj() {
        if (this.new_proj_dialog_data.proj_name.trim() === '') {
          this.$message.error('请输入项目名');
          return;
        }

        this.new_proj_dialog_visible = false;

        let post_data = this.new_proj_dialog_data;
        post_data.team_id = this.team_id;

        this.$axios
          .post('/project/createProj', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('新建项目成功');
            } else {
              this.$message.error(res.data.msg);
            }
            this.$router.go(0);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      edit_proj_prompt(proj_data) {
        this.edit_proj_dialog_visible = true;
        this.edit_proj_dialog_data.proj_id = proj_data.proj_id;
        this.edit_proj_dialog_data.proj_name = proj_data.proj_name;
        this.edit_proj_dialog_data.proj_info = proj_data.proj_info;
        this.edit_proj_dialog_data.start_time = proj_data.start_time;
        this.edit_proj_dialog_data.end_time = proj_data.end_time;
      },

      edit_proj() {
        if (this.edit_proj_dialog_data.proj_name.trim() === '') {
          this.$message.error('请输入项目名');
          return;
        }

        this.edit_proj_dialog_visible = false;

        let post_data = this.edit_proj_dialog_data; // 参考 edit_proj_prompt

        this.$axios
          .post('/project/modifyProjInfo', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('编辑项目成功');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      delete_proj_prompt(proj_id) {
        this.$confirm('是否删除项目？', '删除项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // this.$message.success('成功删除项目' + proj_id);
          this.delete_proj(proj_id);
        });
      },

      delete_proj(proj_id) {
        console.log('delete:' + proj_id);
        let delete_proj_ifo = {
          proj_id: proj_id,
          time: this.get_now_time(),
        };
        console.log('proj_id:' + delete_proj_ifo.proj_id),
          console.log('time:' + delete_proj_ifo.time),
          this.$axios
            .post('/project/deleteProj', qs.stringify(delete_proj_ifo), {
              headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
              },
            })
            .then((res) => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.$router.go(0);
              } else {
                this.$message.error(res.data.msg);
              }
              this.$router.go(0);
            })
            .catch((err) => {
              this.$message.error(err);
            });
      },

      invite_member_prompt() {
        let invite_key;

        this.$prompt('请输入对方邮箱', '邀请成员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '邮箱不能为空',
        })
          .then(({ value }) => {
            if (value === '') return;
            invite_key = value;
            this.invite_member(invite_key);
          })
          .catch(() => {
            return;
          });
      },

      invite_member(invite_key) {
        let post_data = {
          teamid: this.team_id,
          userid: invite_key,
        };

        this.$axios
          .post('/team/invite_user', qs.stringify(post_data), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('成功邀请成员！');
              this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      get_now_time() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        return time;
      },

      get_team_info() {
        this.team_id = this.$route.query.id;

        this.$axios
          .post('/team/teamspace', qs.stringify({ teamid: this.team_id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            // console.log(res.data.projs);
            console.log(res.data);
            this.team_name = res.data.teamname;
            this.proj_data = res.data.projs;
            this.member_data = res.data.members;
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      copy_proj(proj_id) {
        let copy_ifo = {
          proj_id: proj_id,
          copy_time: this.get_now_time(),
        };
        console.log('id:' + copy_ifo.proj_id + '\ntime:' + copy_ifo.copy_time);
        this.$axios
          .post('/project/copy_project', qs.stringify(copy_ifo), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$router.go(0);
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      refresh() {
        this.$router.go(0);
      },

      sort_proj(sort_type) {
        this.sort_type = sort_type;
        let sort_ifo = {
          teamid: this.$route.query.id,
          according: sort_type,
        };
        this.$axios
          .post('/project/project_order', qs.stringify(sort_ifo), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              // this.$message.success('...');
              this.proj_data = res.data.data;
              this.is_searchORorder = 1;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      complete_input(value) {
        console.log(value);
        this.keyword_input = value;
        this.monitor_input();
      },

      monitor_input() {
        // if (this.keyword_input === '') console.log('nothing');

        // console.log(this.keyword_input);
        let search_ifo = {
          projName: this.keyword_input,
          teamid: this.team_id,
        };
        // console.log('name:'+search_ifo.projName+'teamid:'+search_ifo.teamid);
        this.$axios
          .post('project/search_team_project', qs.stringify(search_ifo), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              // this.$message.success('...');
              this.list = res.data.data;
              // console.log(res.data.data);
              // console.log(this.list);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      click_search() {
        this.search_dialogVisible = false;
        console.log('search');
        let search_ifo = {
          projName: this.keyword_input,
          teamid: this.team_id,
        };
        console.log('name:' + search_ifo.projName + 'teamid:' + search_ifo.teamid);
        this.$axios
          .post('project/search_team_project', qs.stringify(search_ifo), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              // this.$message.success('...');
              this.proj_data = res.data.data;
              this.is_searchORorder = 1;
              console.log(res.data.data);
              // console.log(this.list);
            } else {
              this.$message.error(res.data.msg);
            }
          });
      },

      start_search() {
        this.search_dialogVisible = true;
      },
      get_data(cb) {
        this.handle_data();
        // return this.list
        // this.monitor_input();
        console.log(this.list_new);
        cb(this.list_new);
      },
      handle_data() {
        // this.list_new= this.list.map((terminal) => {
        //         return {
        //           value: projName,
        //           name: projId,
        //         };
        //       });
        this.list_new = JSON.parse(JSON.stringify(this.list).replace(/projName/g, 'value'));
      },
      querySearch(queryString, cb) {

      var list = this.list;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return list => {
        return (
          list.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

      delete_team_prompt() {
        this.$confirm('是否解散团队？团队中的所有项目将会永久被删除。', '解散团队', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.delete_team();
        });
      },

      delete_team() {
        this.$axios
          .post('/team/delete_team', qs.stringify({ teamid: this.team_id }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('解散团队成功！');
              setTimeout(() => {
                this.$router.push('personcenter');
              }, 1000);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
    },
    mounted() {
      // this.timer = setInterval(this.monitor_input, 1000);
    },
    beforeDestroy() {
      // clearInterval(this.timer);
    },

    created() {
      this.get_team_info();
      // console.log(this.get_now_time());
    },

    watch: {
      $route(to, from) {
        if (to.query.id !== from.query.id) {
          this.id = to.query.id;
          this.get_team_info();
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
    flex-direction: column;
    padding-left: 20px;
  }

  #title {
    width: 100%;
    height: 60px;
    padding-top: 10px;
    text-align: left;
    font-size: 35px;
    font-weight: bold;
  }

  #projs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 200px;
  }

  .proj-title {
    font-size: 25px;
    color: #333;
    font-weight: bold;
  }

  .one-proj {
    width: 250px;
    height: 150px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .new-proj {
    width: 100px;
    height: 150px;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
  }

  #members {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .one-member {
    margin: 10px;
  }

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border-style: solid;
    border-color: rgb(230, 230, 250);
    border-width: 1px;
    /* background-color: greenyellow; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0 6px 6px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04); */
  }

  .avatar :hover {
    border-radius: 45px;
    background-color: rgb(230, 230, 250);
    opacity: 0.9;
  }

  #username {
    color: grey;
    margin-top: 10px;
  }

  .invite-member {
    font-size: 30px;
  }

  .buttom {
    display: flex;
    margin-top: 20px;
    padding-left: 40px;
    text-align: left;
    /* bottom: 100px; */
  }

  .bottom2 {
    /* top:100px; */
    /* margin-bottom: 100px; */
    /* padding-bottom: 20px; */
  }

  a,
  .router-link-active {
    text-decoration: none;
  }

  .el-dropdown-link {
    display: flex;
    cursor: pointer;
    color: #409eff;
    margin: 10px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .search-input {
    display: flex;
    width: 130px;
    height: 30px;
    color: #666;
    /* margin: 10px; */
    margin-top: 0px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .search-content {
    z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
  }
  .item-ul {
    float: top;
    display: flex;
    flex-direction: column;
    padding: 1px;
    text-align: center;
    margin-left: 11px;
    margin-top: -12px;
    border: 1px solid black;
    width: 132px;
    background-color: whitesmoke;
    /* left: ; */
  }
  .search-item {
    /* 
            background: #fff;
            color: #666;
            list-style: none;
            border: 1px solid #f4f4f4; */
    display: flex;
    list-style: none;
    width: 100px;
    height: 30px;
    color: #666;

    /* margin: ; */
    /* border: 1px solid #f4f4f4; */
  }

  .search {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* margin: 10px; */
    /* border: 1px solid #f4f4f4; */
  }

  .search_button {
    /* display: flex; */
    margin: 10px;
  }

  .sort_and_search {
    display: flex;
  }

  .all_input {
    display: flex;
    flex-direction: column;
  }

  .one_search_result {
    font-size: 18px;
    font-weight: 800;
  }

  .search_proj_input {
    display: flex;
    margin-bottom: 20px;
    /* flex-direction:column;
    justify-content: center;
    align-items: center; */
    /* width: 500px; */
  }

  .col1 {
    /* display: flex; */
    /* margin-bottom: -100px; */
  }

  .search_dialog {
    /* display: flex; */
    flex-direction: row;
    /* align-content: center; */
    align-items: center;
  }

  .bottom {
    /* size: 10px; */
  }

  .single_search_bottom {
    display: flex;
    margin: 10px;
  }
</style>
