<template>
    <div>

    <div v-if="this.$store.state.login_state == 0" class="login"> <h1>请登录</h1> </div>
    <div v-else>
        <div v-if="this.modify_state === 0">
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="                
                modify_state = 1;
                input_username = username;
                input_password = '';
                input_password2 = '';
                ">
                修改信息
              </el-button>
            </div>


            <img src="../assets/user_photo.jpg" class="avatar">

            <div style="font-size: 25px; margin: 5px;">{{username}}</div>

            <el-descriptions border style="margin: 15px;">
              <el-descriptions-item label="uid">{{uid}}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{truename}}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{email}}</el-descriptions-item>
            </el-descriptions>

          </div>
          <el-divider>我的团队</el-divider>
        <div id="teams">
      <div class="one-team">
        <el-button id="team_pic"><img src="../assets/team.jpg" id="team_pic" @click="goto_team"></el-button>
        <div id="team_name">团队名</div>
      </div>

      <div class="one-team">
        <el-button id="team_pic"><img src="../assets/team.jpg" id="team_pic" @click="goto_team"></el-button>
        <div id="team_name">团队名</div>
      </div>
    </div>
        </div>
        <div v-else>
             <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="
                modify_state = 0;
                input_username = username;
                input_password = '';
                input_password2 = '';
                ">
                返回
              </el-button>
            </div>

            <el-upload class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :limit="1" :auto-upload="true">
              <img v-if="url_upload" :src="url_upload" class="avatar">
              <img v_else src="../assets/user_photo.jpg" class="avatar">
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
        url_upload: undefined,
        url_now: this.$store.state.user_photo,
        team_ifo:[
    {
        teamname: 'team.teamname',
        teamid : 'team.teamid',
        // proj: [{'proj_id': proj.projID, 'proj_name':proj.projName}]
    },
        ]
      }
    },
    methods:
    {
      goto_team(){
          this.$router.push({ path: '/'});
      },
      modify_username(){

      },
      modify_pwd(){

      }
    },
  };
</script>

<style>
    .avatar {
    width: 180px;
    height: 180px;
    border-radius: 90px;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(230,230,250);
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
  #team_pic {
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(230,230,250);
    background-color: rgb(255,240,245);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #team_pic:hover{
      background-color:rgb(255,240,245);
        filter:alpha(opacity=100); 
        opacity: 0.8;
  }

  #team_name {
    color: grey;
    margin-top: 10px;
  }
</style>