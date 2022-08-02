import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 0:游客 1:普通用户
    login_state: 1,
    userid: 0,
    username: '',
    user_photo: '',
    user_email:'',
    user_truename:'',
    token: '',
  },
  getters: {
  },
  mutations: {
    set_userstate_to_unlogged(state) { state.login_state = 0; },
    set_userstate_to_normal(state) { state.login_state = 1; },
    set_userid(state, userid) { state.userid = userid; },
    set_username(state, username) { state.username = username; },
    set_userphoto(state, userphoto) { state.user_photo = userphoto; },
    set_token(state, token) { state.token = token; },
  },
  actions: {
  },
  modules: {
  }
})
