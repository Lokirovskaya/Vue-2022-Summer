<template>
    <div>

    <div v-if="this.$store.state.login_state == 0" class="login"> <h1>请登录</h1> </div>
    <div v-else>
        <div v-if="this.modify_state === 0">
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <br>
              <el-button style="position:relative;left:-10px;" @click="
                modify_state = 1;
                input_username = username;
                input_password = '';
                input_password2 = '';
                ">
                修改信息
              </el-button>
            </div>

            <img :src="'http://stcmp.shlprn.cn'+this.$store.state.user_photo" class="avatar">
            <div id="username_pc">{{username}}</div>

            <el-descriptions border style="margin: 15px;">
              <el-descriptions-item label="uid"><div class="ifo">{{uid}}</div></el-descriptions-item>
              <el-descriptions-item label="姓名"><div class="ifo">{{truename}}</div></el-descriptions-item>
              <el-descriptions-item label="邮箱"><div class="ifo">{{email}}</div></el-descriptions-item>
            </el-descriptions>

          </div>
          <el-divider><i class="el-icon-user-solid"></i>&nbsp;我的团队</el-divider>
        <div id="teams">
        <div v-for="(team, i) in team_ifo" :key="i" :index="'1-' + i" class="one-team">
        <router-link :to="{ path: '/team', query: { id: team.teamid } }">
        <el-button id="team_button"><img src="../assets/team.png" id="team_pic" @click="goto_team"></el-button>
        </router-link>
        <div id="team_name">{{ team.teamname }}</div>
      </div>
        <!-- </div> -->
        <!-- <div v-else> <h4 style="color:rgb(100,100,100)">暂无团队</h4></div> -->

    </div>
        </div>
        <div v-else>
             <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <br>
              <el-button style="position:relative;left:-10px;" @click="go_back">
                返回
              </el-button>
            </div>

            <el-upload class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"  :auto-upload="true" :showFileList="false">
              <img :src="'http://stcmp.shlprn.cn'+this.$store.state.user_photo" class="avatar">
            </el-upload>
            <div>点击上方修改头像</div>

            <el-divider></el-divider>

            <div style="margin: 10px;">
              <div>修改用户名</div>
              <el-input placeholder="输入新用户名" v-model="input_username" style="margin: 5px;" clearable></el-input>
              <br />
              <el-button size="small" @click="modify_username">提交</el-button>
            </div>

            <div style="margin: 10px;">
              <div>修改密码</div>
              <el-input placeholder="输入新密码" v-model="input_password" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-input placeholder="确认密码" v-model="input_password2" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-button size="small" @click="modify_pwd">修改密码</el-button>
            </div>
          </div>
        </div>

        
    </div>

    </div>

</template>

<script>
import qs from "qs";
// import { compile } from 'vue/types/umd';
  export default {
    name: 'PersonCenter',
    data() {
      return {
        username: this.$store.state.username,
        uid:this.$store.state.userid,
        truename:this.$store.state.user_truename,
        email:this.$store.state.user_email,
        modify_state: 0,
        input_username: undefined,
        input_password: undefined,
        input_password2: undefined,
        is_visit_self: 0, //0：访问自己主页
        team_ifo:[],
      }
    },
    methods:
    {
      goto_team(){
          this.$router.push({ path: '/'});
      },
      modify_username(){
        let username_ifo = {
          username:this.input_username,
        }
          this.$axios.post('/team/modify_username', qs.stringify(username_ifo), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.msg);
              this.$store.commit('set_username', res.data.username); 
              // this.$router.go(0);
              // this.modify_state = 0;
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      modify_pwd(){
          let password_ifo = {
          password_1: this.input_password,
          password_2: this.input_password2
        }
        if (this.input_password === '') {
          this.$message.error('密码不能为空');
        }
        else if (this.input_password2 === '') {
          this.$message.error('请再次输入密码');
        }
        else {
          this.$axios.post('/team/modify_password', qs.stringify(password_ifo),
            {
              headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
              }
            })
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
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
      
      upload_file(e) {
        let formData = new FormData();
        formData.append('in_file', e.file);
        let my_axios = this.$axios.create({
          withCredentials: true,
          headers: {
            userid: this.$store.state.userid,
                token: this.$store.state.token,
            'Content-Type': 'multipart/form-data'
          }
        });
        my_axios.post('/team/modify_photo', { photo: e.file })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('头像修改成功！');
              console.log('new:'+res.data.photo);
              this.$store.commit('set_userphoto', res.data.photo); 
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      handleAvatarSuccess(res, file) {
        console.log('success');
        // alert('imageurl:' + this.imageUrl);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log('before');
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      init_teamifo(){
        console.log('uid:'+this.$store.state.userid+'\ntoken:'+this.$store.state.token)
          this.$axios.post('/team/userspace', qs.stringify({}),{
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
            .then(res => {
                console.log(res.data.data);
                this.team_ifo = res.data.data;
            })
            .catch(err => {
              this.$message.error(err);
            });

      },

      go_back() {
          this.modify_state = 0;
                this.$router.go(0);
      }

    },
    mounted: function () {
      // alert('页面一加载，就会弹出此窗口')
      this.init_teamifo();
      console.log(this.$store.state.user_photo)
    },
  };
</script>

<style>
    .avatar {
      display: flex;
    width: 180px;
    height: 180px;
    border-radius: 20px;
    border-style: solid;
    border-width: 2px;
    border-color:#D3D3D3;
  }
  .avatar :hover{
    display: flex;
    background-color:rgb(255,240,245);
        filter:alpha(opacity=100); 
        opacity: 0.8;
  }
    #teams {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    /* padding-left: 40px; */
  }
  .one-team {
    margin: 10px;
  }
  #team_button{
    width: 70px;
    height: 70px;
    border-radius: 40px;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(200,200,200);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #team_pic {
    width: 50px;
    height: 50px;
    border-radius: px;
    /* border-style: solid;
    border-width: 1px;
    border-color:rgb(230,230,250); */
    /* background-color: rgb(255,240,245); */
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
  }
  #team_pic:hover{
      /* background-color:rgb(255,240,245); */
        filter:alpha(opacity=100); 
        opacity: 0.7;
  }

  #team_name {
    color: #696969;
    margin-top: 10px;
    font-weight: 600;
    font-size: 14px;
  }

  #username_pc {
    font-size: 25px; 
    font-weight: 500;
    color: rgb(70, 70, 70);
    margin: 5px;
  }

  .ifo {
    font-size: 15px; 
    font-weight: 450;
    color: rgb(70, 70, 70);
    /* margin: 5px; */
  }


</style>