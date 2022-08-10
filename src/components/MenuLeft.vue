<template>
  <div id="main">
    <div id="left">
      <el-menu
        id="menu"
        :collapse="collapse"
        background-color="#ECF5FF"
        text-color="#000"
        active-text-color="#7AC29A"
      >
        <div style="width: 100%; height: 60px; text-align: left; margin-left: 10px">
          <img :src="'http://stcmp.shlprn.cn' + this.$store.state.user_photo" class="avatar" />
        </div>
        <el-submenu index="1">
          <template slot="title">{{ this.$store.state.username }}</template>

          <el-menu-item-group>
            <template slot="title">
              <div style="font-size: 20px; color: #555; font-weight: bold">
                {{ this.$store.state.username }}
              </div>
            </template>

            <el-menu-item>
              <router-link :to="{ path: '/personcenter' }">
                <el-link :underline="false">
                  <span class="el-icon-postcard"></span>
                  <span>个人中心</span>
                </el-link>
              </router-link>
            </el-menu-item>

            <el-menu-item>
              <div @click="logout()">
                <el-link :underline="false">
                  <span class="el-icon-switch-button"></span>
                  <span>退出登录</span>
                </el-link>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-divider></el-divider>

        <el-submenu index="2">
          <template slot="title">
            <div v-if="collapse" class="el-icon-user" style="width: 200px; text-align: left">
              <br />
              <div style="font-size: 12px; margin-top: 5px">团队</div>
            </div>
            <div v-else class="el-icon-user" style="width: 200px; text-align: left">
              <span style="font-size: 17px; margin-left: 5px; position: relative; bottom: 3px">团队</span>
            </div>
          </template>

          <el-menu-item-group>
            <div slot="title">我加入的团队</div>
            <el-menu-item v-for="(team, i) in teamdata" :key="team.teamid" :index="'team' + i">
              <router-link :to="{ path: '/team', query: { id: team.teamid } }">
                <el-link :underline="false" >
                  <span class="el-icon-user"></span>
                  <span>{{ team.teamname }}</span>
                </el-link>
              </router-link>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item>
              <template slot="title">
                <div @click="create_team_prompt()" style="font-color: #7ac29a">
                  <span class="el-icon-circle-plus-outline"></span>
                  <span>新建团队</span>
                </div>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <div v-if="collapse" class="el-icon-tickets" style="width: 200px; text-align: left">
              <br />
              <div style="font-size: 12px; margin-top: 5px">项目</div>
            </div>
            <div v-else class="el-icon-tickets" style="width: 200px; text-align: left">
              <span style="font-size: 17px; margin-left: 5px; position: relative; bottom: 3px">项目</span>
            </div>
          </template>

          <el-menu-item-group>
            <div slot="title">最近项目</div>
            <el-menu-item v-for="(proj, i) in recent_proj" :key="proj.proj_id" :index="'proj' + i">
              <router-link :to="{ path: '/project', query: { id: proj.proj_id } }">
                <el-link :underline="false">
                  <span class="el-icon-user"></span>
                  <span>{{ proj.team_name }}</span>
                  <span style="font-weight: bold"> / </span>
                  <span class="el-icon-tickets"></span>
                  <span style="font-weight: bold">{{ proj.proj_name }}</span>
                </el-link>
              </router-link>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item>
              <template slot="title">
                <div @click="clear_recent_proj()" style="font-color: #7ac29a">
                  <span class="el-icon-circle-close"></span>
                  <span>清除所有</span>
                </div>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <div v-if="collapse" class="el-icon-folder-opened" style="width: 200px; text-align: left">
              <br />
              <div style="font-size: 12px; margin-top: 5px">文档</div>
            </div>
            <div v-else class="el-icon-folder-opened" style="width: 200px; text-align: left">
              <span style="font-size: 17px; margin-left: 5px; position: relative; bottom: 3px">文档</span>
            </div>
          </template>

          <el-menu-item-group>
            <!-- <DocCenter></DocCenter> -->
            <div slot="title">项目文档</div>
            <el-menu-item v-for="(doc, i) in doc_ifo" :key="doc.doc_name" :index="'doc' + i">
              <el-link :underline="false">
                <el v-for="(doc, i) in doc_ifo" :key="doc.doc_name" :index="'doc' + i">
                  <li></li>
                </el>

                <span class="el-icon-tickets"></span>
                <span>{{ doc.belong_proj }}</span>
                <span style="font-weight: bold"> / </span>

                <span class="el-icon-folder-opened"></span>
                <span style="font-weight: bold">{{ doc.doc_name }}</span>
              </el-link>
              <!-- </router-link> -->
              <el-link :underline="false">
                <el v-for="(doc, i) in doc_ifo" :key="doc.doc_name" :index="'doc' + i">
                  <li></li>
                </el>

                <span class="el-icon-tickets"></span>
                <span>{{ doc.belong_proj }}</span>
                <span style="font-weight: bold"> / </span>

                <span class="el-icon-folder-opened"></span>
                <span style="font-weight: bold">{{ doc.doc_name }}</span>
              </el-link>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item>
              <template slot="title">
                <div @click="clear_recent_doc()" style="font-color: #7ac29a">
                  <span class="el-icon-circle-close"></span>
                  <span>清除所有</span>
                </div>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- <DocCenter :teamid="teamid_now"></DocCenter> -->

        
      </el-menu>
      <div id="collapse-button">
        <el-button
          v-if="collapse"
          icon="el-icon-arrow-right"
          type="primary"
          circle
          @click="change_menu_collapse()"
        ></el-button>
        <el-button
          v-else
          icon="el-icon-arrow-left"
          type="primary"
          circle
          @click="change_menu_collapse()"
        ></el-button>
      </div>
    </div>
    <div id="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  // import DocCenter from '@/views/DocCenterView.vue';
  export default {
    name: 'HomeView',
    // components: {DocCenter},

    data() {
      return {
        teamid_now:undefined,
        collapse: true,
        // collapse_routers: []
        // 结构见文档 /team/userspace
        teamdata: [],
        // {proj_id, proj_name, team_name}
        recent_proj: [],
        doc_ifo: [
          {
            doc_name: 'abc',
            belong_proj: 'proj1',
          },
          {
            doc_name: 'abc',
            belong_proj: 'proj2',
          },
          {
            doc_name: 'abc',
            belong_proj: 'proj3',
          },
        ],
      };
    },

    methods: {
      store_teamid(team) {
        this.teamid_now = team.teamid;
      },

      change_menu_collapse() {
        this.collapse = !this.collapse;
        let left_menu = document.getElementById('left');
        let width = this.collapse ? '65px' : '250px';
        left_menu.style.width = width;
      },

      logout() {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$store.commit('set_userstate_to_unlogged'); //切换到游客状态
            this.$store.commit('set_userid', 0);
            this.$store.commit('set_username', '');
            this.$store.commit('set_token', '');
            this.$router.push({ path: '/' });
          })
          .catch(() => {
            return;
          });
      },

      create_team_prompt() {
        let teamname;

        this.$prompt('请输入团队名', '新建团队', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '团队名不能为空',
        })
          .then(({ value }) => {
            if (value === '') return;
            teamname = value;
            this.create_team(teamname);
          })
          .catch(() => {
            return;
          });
      },

      create_team(teamname) {
        this.$axios
          .post('/team/create_team', qs.stringify({ teamname: teamname }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token,
            },
          })
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success('团队创建成功！');
              setTimeout(() => {
                this.$router.go(0);
              }, 500);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },

      clear_recent_proj() {
        this.recent_proj.splice(0, this.recent_proj.length);
        this.$store.commit('clear_recent_proj');
      },
    },

    created() {
      this.$axios
        .post('/team/userspace', qs.stringify({}), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          },
        })
        .then((res) => {
          this.teamdata = res.data.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });

      this.recent_proj = this.$store.state.recent_proj;
    },
    clear_recent_doc() {},
  };
</script>

<style scoped>
  #main {
    display: flex;
    width: 100%;
    height: 100%;
  }

  #left {
    width: 65px;
    min-height: 100%;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: #ecf5ff;
    padding-right: 1px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    transition: width 0.5s;
  }

  #menu {
    max-height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin-top: 15px;
  }

  #right {
    width: 100%;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-left: 20px;
    padding-bottom: 20px;
  }

  #collapse-button {
    width: 100%;
    align-self: flex-end;
    text-align: center;
    margin-bottom: 20px;
  }

  a,
  .router-link-active {
    text-decoration: none;
  }
</style>
