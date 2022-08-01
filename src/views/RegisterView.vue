<template>
  <div class="register">
    <h1>欢迎注册</h1>
    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
    <p>
      <el-input placeholder="确认密码" v-model="input_password2" clearable style="width:300px" show-password></el-input>
    <div>
      <el-button @click="register()" round>注册</el-button>
      <router-link to="/login" style="margin: 5px;">
        <el-button round>去登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input_id: "",
        input_password: "",
        input_password2: ""
      }
    },
    methods: {
      register() {
        if (this.input_id === '') {
          this.$message.error('用户名不能为空！');
        }
        else if (this.input_password === '') {
          this.$message.error('密码不能为空！');
        }
        else if (this.input_password2 === '') {
          this.$message.error('请再次输入密码！');
        }
        else if (this.input_password !== this.input_password2) {
          this.$message.error('两次输入的密码不一致！');
        }
        //else 传给后端
      }
    }
  }
</script>