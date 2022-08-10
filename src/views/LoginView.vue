<template>
<!-- <div id="background"> -->
  <div class="login">
    <!-- <font-awesome-icon icon="fa-solid fa-arrow-left" /> -->
    <!-- <i class="fa-solid fa-arrow-left"  ></i> -->
    <img src="../assets/back_icon.png" id="back_icon" @click="backto_homeview">

    <div v-if="this.$store.state.login_state == 0">


    <h1>请登录</h1>

    <el-input placeholder="输入邮箱" v-model="userid" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="password" clearable style="width:300px" show-password></el-input>
    <p>

    <div>
      <el-button @click="login" round>登录</el-button>
      <router-link to="/register" style="margin: 5px;">
        <el-button round>去注册</el-button>
      </router-link>
    </div>
    </div>
    <div v-else>
      {{this.$store.state.username}}已登录
    </div>
    </div>
<!-- </div> -->

</template>

<script>
import qs from "qs";
  export default {
    data() {
      return {
        userid: "",
        password: "",
      }
    },
    methods: {
      login() {
        if (this.userid === '') {
          this.$message.error('uid不能为空');
        }
        else if (this.password === '') {
          this.$message.error('密码不能为空');
        }
        else{
          this.$axios.post('/team/login', qs.stringify(this.$data))
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.data.username + ' 登录成功！');
              this.$store.commit('set_userstate_to_normal'); //更新全局变量
              this.$store.commit('set_token', res.data.data.authorization);
              this.$store.commit('set_username', res.data.data.username); 
              this.$store.commit('set_userid', res.data.data.userid); 
              this.$store.commit('set_userphoto', res.data.data.photo); 
              this.$store.commit('set_email', res.data.data.email); 
              this.$store.commit('set_truename', res.data.data.truename); 
              this.$store.commit('clear_recent_proj'); 
              this.$router.push({path:'/personcenter'});
              // alert('username:'+res.data.data.username+'\nemail:'+res.data.data.email+'\ntruename:'+res.data.data.truename+'\ntoken:'+res.data.data.authorization);
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
        }

      },
      backto_homeview(){
        this.$router.push({path:'/'});
      }
    },
  }
</script>

<style scoped>
  #back_icon {
    width: 50px;
    height: 50px;
    /* margin: 20px; */
    padding-left: 50px;
    padding-top: 20px;
    /* margin-left: 30px; */
    border-radius: px;
    display: flex;

    align-items: center;
    justify-content: center;
    opacity: 1;
  }
  #back_icon:hover{
      /* background-color:rgb(255,240,245); */
        filter:alpha(opacity=100); 
        opacity: 0.8;
  }
  #background {
    background:url("../assets/homeview_bk.jpg");
  width:100%;
  height:100%;
  /* position:fixed; */
  background-size:100% 100%;
  opacity :0.9
  }
</style>