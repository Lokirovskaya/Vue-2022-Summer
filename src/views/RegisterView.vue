<template>

  <div v-if="register_state===0" class="register">
     <img src="../assets/back_icon.png" id="back_icon" @click="backto_homeview">
    <h1>欢迎注册</h1>
    <el-input placeholder="输入用户名" v-model="username" clearable style="width:300px"></el-input>
    <p>
    <el-input placeholder="输入真实姓名" v-model="truename" clearable style="width:300px"></el-input>
    <p>
    <el-input placeholder="输入密码" v-model="password_1" clearable style="width:300px" show-password></el-input>
    <p>
    <el-input placeholder="确认密码" v-model="password_2" clearable style="width:300px" show-password></el-input>
    <p>
    <el-input placeholder="输入邮箱" v-model="email" clearable style="width:300px"></el-input>
    <div>
      <el-button @click="send_verifycode" round>注册</el-button>
      <router-link to="/login" style="margin: 5px;">
        <el-button round>去登录</el-button>
      </router-link>
    </div>
  </div>
  <div v-else-if="register_state===1">
    <br><br>
      <el-input placeholder="输入验证码" v-model="verifycode_input" clearable style="width:300px"></el-input>
      <!-- <el-button @click="check_verifycode" round style="margin: 5px;">重发</el-button> -->
      <div>
        <br>
      <el-button @click="check_verifycode" round style="margin: 5px;">确定</el-button>
      <!-- <el-button @click="check_verifycode" round style="margin: 5px;">重发</el-button> -->
    </div>
  </div>
  <div v-else>
    <!-- <el-divider></el-divider> -->
    <br>
    <h3 style="color:rgb(100,100,100)">{{this.username}}注册成功</h3>
    <!-- <el-divider></el-divider> -->
    <router-link to="/login" style="margin: 5px;">
        <el-button round>去登录</el-button>
      </router-link>
  </div>
</template>

<script>
import qs from "qs";
  export default {
    data() {
      return {
        username: "",
        truename: "",
        password_1: "",
        password_2: "",
        email: "",
        uid_toshow:undefined,
        register_state:0, //0:输入信息界面 1:输入验证码界面 2:注册成功
        verifycode:undefined,
        verifycode_input:undefined,
      }
    },
    methods: {
      send_verifycode() {
        if (this.username === '') {
          this.$message.error('用户名不能为空');
        }
        else if (this.truename === '') {
          this.$message.error('真实姓名不能为空');
        }
        else if (this.password_1 === '') {
          this.$message.error('密码不能为空');
        }
        else if (this.password_2 === '') {
          this.$message.error('请再次输入密码');
        }
        else if (this.email === '') {
          this.$message.error('邮箱不能为空');
        }
        else if (this.password_1 != this.password_2) {
          this.$message.error('两次输入密码不一致');
        }
        else {
          let sendVerifyCode_ifo = {
            email:this.email,
            judge:1,
          }
          console.log(sendVerifyCode_ifo.email+'\n'+sendVerifyCode_ifo.judge)
          this.$axios.post('team/sendVerifyCode', qs.stringify(sendVerifyCode_ifo))
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
      this.verifycode = res.data.code;
      this.register_state = 1;
    } else {
      // alert(123);
      this.$message.error(res.data.msg);
    }
  })
  .catch((err) => {
    this.$message.error(err);
  });
        }
      },
      
      send_again() {
        let sendVerifyCode_ifo = {
            email:this.email,
            judge:1,
          }
          console.log(sendVerifyCode_ifo.email+'\n'+sendVerifyCode_ifo.judge)
          this.$axios.post('projteam/sendVerifyCode', qs.stringify(sendVerifyCode_ifo))
  .then((res) => {
    if (res.data.errno === 0) {
      this.$message.success(res.data.msg);
      this.verifycode = res.data.code;
      this.register_state = 1;
    } else {
      this.$message.error(res.data.msg);
    }
  })
  .catch((err) => {
    this.$message.error(err);
  });
      },

      check_verifycode() {
            if (this.verifycode != this.verifycode_input) {
              this.$message.error('验证码错误');
            }
            else {
                this.$axios.post('/team/register', qs.stringify(this.$data))  
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success('注册成功');
                this.uid_toshow = res.data.userid;
                this.register_state = 2;
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

    }
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
</style>