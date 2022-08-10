<template>
  <div id="background">
  <div v-if="register_state===0" class="register">
    <!-- <i class="fa-solid fa-arrow-left"  ></i> -->
     <!-- <img src="../assets/back_icon.png" id="back_icon" @click="backto_homeview"> -->
    <!-- <h1>欢迎注册</h1> -->
    <!-- <div class="steps"> -->
      <div>
    <el-steps :space="150" align-center=true :active="active" finish-status="success" class="steps">
  <el-step title="填写信息" class="one_step" ></el-step>
  <el-step title="邮箱验证" class="one_step"></el-step>
</el-steps>

    </div>
    <div class="inputs">
    <p><el-input placeholder="输入用户名" v-model="username" clearable style="width:300px"></el-input></p>
    <!-- <br> -->
    <p><el-input placeholder="输入邮箱" v-model="email" clearable style="width:300px"></el-input></p>
    
    <p><el-input placeholder="输入真实姓名" v-model="truename" clearable style="width:300px"></el-input></p>
    
    <el-input placeholder="输入密码" v-model="password_1" v-on:input="show_pwd_strength" clearable class="input_ifo" show-password></el-input>
    

      <div class="show_pwds">
    <span v-if="show_pwd_strength_flag === 1" class="show_pwd1">{{this.pwd_strength}}</span>
    <span v-else-if="show_pwd_strength_flag === 2" class="show_pwd2">{{this.pwd_strength}}</span>
    <span v-else-if="show_pwd_strength_flag === 3" class="show_pwd3">{{this.pwd_strength}}</span>
      </div>
    <!-- <p> -->
    <el-input placeholder="确认密码" v-model="password_2" clearable style="width:300px" show-password></el-input>
    </div>
    
    <div>
      
      <p><el-button @click="send_verifycode" round>下一步</el-button></p>
      
      <!-- <router-link to="/login" style="margin: 5px;">
        <el-button round>去登录</el-button>
      </router-link> -->
    </div>
  </div>
  <div v-else-if="register_state===1" class="input_verifycode">
    <br><br>
    <div>
    <el-steps :space="150" align-center=true :active="active" finish-status="success" class="steps">
  <el-step title="填写信息" class="one_step"></el-step>
  <el-step title="邮箱验证" class="one_step"></el-step>
</el-steps>

    </div>
      <br>
      <p><el-input placeholder="输入验证码" v-model="verifycode_input" clearable style="width:200px"></el-input></p>
      <!-- <el-button @click="check_verifycode" round style="margin: 5px;">重发</el-button> -->
      <div>
        <br><br><br><br><br><br><br><br><br>
      <el-button @click="check_verifycode" round style="margin: 5px;">确定</el-button>
      <!-- <el-button @click="check_verifycode" round style="margin: 5px;">重发</el-button> -->
    </div>
  </div>
  <div v-else>
    <!-- <el-divider></el-divider> -->
    <br>
    <div>
    <el-steps :space="150" align-center=true :active="active" finish-status="success" class="steps">
  <el-step title="填写信息" class="one_step"></el-step>
  <el-step title="邮箱验证" class="one_step"></el-step>
</el-steps>
    </div>
    <h2 style="color:rgb(100,100,100)">{{this.username}}注册成功</h2>
    <!-- <el-divider></el-divider> -->
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
        uid_toshow:undefined,
        register_state:0, //0:输入信息界面 1:输入验证码界面 2:注册成功
        verifycode:undefined,
        verifycode_input:undefined,
        active:0,
        pwd_strength:'1',
        show_pwd_strength_flag:0,
        show_pwd_strength_color:"red",
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
      this.active = 1;
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
                this.active = 2;
                this.$router.push({path:'/login'});
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
      },

  show_pwd_strength(pwd){
    console.log('show_pwd');
    // this.show_pwd_strength_flag = 1;
    this.pwd_strength = this.check_pwd_strength(pwd);
  },

  check_pwd_strength(pwd) {
    if (pwd === '')
    {
      this.show_pwd_strength_flag = 0;
      return;
    }
        var upper_cnt = 0;
        var lower_cnt = 0;
        var mum_cnt = 0;
        var mark_cnt = 0;
        var type_cnt = 0;
        var all_cnt = 0;
        for (let i = 0; i < pwd.length; i++)
        {
          if (pwd.charCodeAt(i) >= 48 && pwd.charCodeAt(i) <= 57) mum_cnt++; //数字
          else if (pwd.charCodeAt(i) >= 65 && pwd.charCodeAt(i) <= 90) upper_cnt++; //大写字母
          else if (pwd.charCodeAt(i) >= 97 && pwd.charCodeAt(i) <= 122) lower_cnt++; //小写字母 
          else mark_cnt += 4;
        }
        all_cnt = mum_cnt + upper_cnt + lower_cnt + mark_cnt;
        if (upper_cnt != 0) type_cnt++;
        if (lower_cnt != 0) type_cnt++;
        if (mum_cnt != 0) type_cnt++;
        if (mark_cnt != 0) type_cnt++;
        console.log('type_cnt:'+type_cnt+' all_cnt:'+all_cnt);
        if (type_cnt === 4 && all_cnt >= 15)
        {
          this.show_pwd_strength_flag = 3;
          return '*密码安全';
        }
        else if (all_cnt >= 10)
        {
          this.show_pwd_strength_flag = 2;
          return '*密码强度适中';
        }
        else
        {
          this.show_pwd_strength_flag = 1;
          return '*密码强度较低';
        }
        
      }

    },
    
  }
</script>

<style scoped>
  .inputs {

  }
  
  .register {
    display: flex;
    justify-content: center;
    flex-direction:column;

    background-color: white;
    width: 400px;
    height: 500px;
    color: black; 
  border: 1px #d7edff solid; 
  border-radius: 5px; 
  margin: 0px 0px 7px 0px;
  box-shadow:5px 5px 10px rgb(179, 184, 194);
  background: linear-gradient(to top,#f1e6e9, #e2e8f7);
  }

  .input_verifycode {
    background-color: white;
    width: 400px;
    height: 500px;
    color: black; 
  border: 1px #d7edff solid; 
  border-radius: 5px; 
  margin: 0px 0px 7px 0px;
  box-shadow:5px 5px 10px rgb(179, 184, 194);
  background: linear-gradient(to top,#f1e6e9, #e2e8f7);
  }

#background {
    display: flex;
    align-items:center;
    justify-content: center;
    background:url("../assets/bk.jpg");
  width:100%;
  height:100%;
  /* position:fixed; */
  background-size:100% 100%;
  opacity :0.9
  }

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
  .steps {
    /* left: 500px; */
    /* left: 50%; */
    display:flex;
    /* justify-content: space-between; */
    justify-content: center;
    margin: 10px;
    /* flex-wrap:nowrap; */
    /* align-items: center; */
    /* width: 1000px; */

  }
  .one_step {
    /* display: flex;
    margin: 50px;
    width: 100px; */
  }
  .register {
    /* display: flex; */
    text-align: center;
    justify-content: center;
  }

  .input_ifo {
    /* display:flex; */
    /* justify-content: center; */
    /* left: 600px; */
    width:300px
  }

  .show_pwd1 {
    /* display: flex;
    align-items: center;
    text-align: center;
    padding-bottom: 10px; */
    /* display: flex;
    align-content: center;
    align-items: center;
    text-align: center; */
    /* left: 300px; */
    font-size: 12px;
    color: red;
    opacity: 0.7;
  }

  .show_pwd2 {
    font-size: 12px;
    color: rgb(255, 145, 0);
  }

  .show_pwd3 {
    font-size: 12px;
    color: green;
  }

  .show_pwds {
    /* display: flex;
    align-content: center;
    align-items: center;
    text-align: center; */
    /* height: px; */
    display: flex;
    align-content: center;
    align-items: center;
    padding-bottom: 9px;
    padding-top: 9px;
    padding-left: 158px;
  }

</style>