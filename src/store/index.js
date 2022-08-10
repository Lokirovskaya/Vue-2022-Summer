import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 0:游客 1:普通用户
    login_state: 0,
    userid: undefined,
    username: '',
    user_photo: '',
    user_email: '',
    user_truename: '',
    token: '',
    recent_proj: [],
    collapse_left_menu: false,
    // file_id_toshow:undefined,
    // file_name_toshow:'',
    team_id_now:undefined,
  },
  getters: {},
  mutations: {
    set_userstate_to_unlogged(state) {
      state.login_state = 0;
    },
    set_userstate_to_normal(state) {
      state.login_state = 1;
    },
    set_userid(state, userid) {
      state.userid = userid;
    },
    set_username(state, username) {
      state.username = username;
    },
    set_userphoto(state, userphoto) {
      state.user_photo = userphoto;
    },
    set_email(state, useremail) {
      state.user_email = useremail;
    },
    set_truename(state, usertruename) {
      state.user_truename = usertruename;
    },
    set_token(state, token) {
      state.token = token;
    },
    set_collapse_left_menu(state, value) {
      state.set_collapse_left_menu = value;
    },
    // 'info' should be {proj_id, proj_name, team_name}
    push_recent_proj(state, info) {
      let found = -1;
      let len = state.recent_proj.length;
      for (let i = 0; i < len; i++) {
        if (state.recent_proj[i].proj_id === info.proj_id) {
          found = i;
          break;
        }
      }

      if (found >= 0) {
        state.recent_proj.splice(found, 1);
      }

      state.recent_proj.unshift({
        proj_id: info.proj_id,
        proj_name: info.proj_name,
        team_name: info.team_name,
      });

      if (state.recent_proj.length > 10) {
        state.recent_proj.pop();
      }
    },
    clear_recent_proj(state) {
      state.recent_proj.splice(0, state.recent_proj.length);
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: 'store',
      render(state) {
        return { ...state };
      },
    }),
  ],
});
