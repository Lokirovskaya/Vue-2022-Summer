<template>
  <div class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
    <p>

    <div>
      <el-button @click="login" round>登录</el-button>
      <router-link to="/register" style="margin: 5px;">
        <el-button round>去注册</el-button>
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
      }
    },
    methods: {
        
    },
  }
</script>