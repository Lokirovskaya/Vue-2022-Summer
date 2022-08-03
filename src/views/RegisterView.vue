<template>
  <div class="register">
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
      <el-button @click="register" round>注册</el-button>
      <router-link to="/login" style="margin: 5px;">
        <el-button round>去登录</el-button>
      </router-link>
    </div>
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
      }
    },
    methods: {
      register() {
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
        else {
          this.$axios.post('/team/register', qs.stringify(this.$data))  
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success('注册成功！您的uid为'+res.data.userid);
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      }
    }
  }
</script>