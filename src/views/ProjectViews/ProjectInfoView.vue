<template>
  <div id="main">
    <div id="project">
      <!--项目内容描述-->
      <el-divider v-if="this.proj_modify === 0"><i class="el-icon-info"></i>&nbsp;项目基本信息</el-divider>
      <el-divider v-else><i class="el-icon-edit"></i>&nbsp;修改项目信息</el-divider>
      <div v-if="this.proj_modify === 0" style="margin-left: 10%;margin-right: 10%;">
        <div style="margin-left: 90%">
          <el-button style="position: relative; bottom: 10px" @click="
            proj_modify = 1;
          input_proj_name = proj_name;
          input_proj_info = proj_info;
          input_proj_start = proj_start;
          input_proj_end = proj_end;
          ">修改信息</el-button>
        </div>
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection"></i>
              项目名
            </template>
            {{ proj_name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              项目创建人
            </template>
            {{ proj_creator }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="fa-solid fa-people-group"></i>
              项目所属团队
            </template>
            {{ proj_team }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-custom"></i>
              参与成员
            </template>
            <span v-for="item in members" :key="item.userid">
              <el-tooltip class="item" effect="light" :content="item.truename" placement="bottom">
                <!-- <el-avatar size="15" :src="item.photo"></el-avatar> -->
                <img class="avatar" :src="'http://stcmp.shlprn.cn' + item.photo" />
              </el-tooltip>
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              项目开始时间
            </template>
            {{ proj_start }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              项目结束时间
            </template>
            {{ proj_end }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              项目描述
            </template>
            {{ proj_info }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!--项目信息修改界面-->
      <div v-else style="margin-left: 10%;margin-right: 10%;">
        <div style="margin-left: 90%">
          <el-button style="position: relative; bottom: 10px" @click="
            proj_modify = 0;
          input_proj_name = '';
          input_proj_info = '';
          input_proj_end = '';
          input_proj_start = '';
          ">返回</el-button>
        </div>
        <div style="margin-left: 30%; margin-right: 30%">
          <span>
            <b>项目名</b><br />
            <el-input placeholder="请输入内容" prefix-icon="el-icon-collection" v-model="input_proj_name"
              style="position: relative; bottom: -5px">
            </el-input>
          </span><br />
          <span style="position: relative; top: 10px">
            <b>开始时间</b><br />
            <el-date-picker v-model="input_proj_start" type="datetime" placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="position: relative; bottom: -5px">
            </el-date-picker>
          </span><br />
          <span style="position: relative; top: 20px">
            <b>结束时间</b><br />
            <el-date-picker v-model="input_proj_end" type="datetime" placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="position: relative; bottom: -5px">
            </el-date-picker>
          </span><br />
          <span style="position: relative; top: 30px">
            <b>项目简介</b>
            <el-input type="textarea" placeholder="请输入内容" v-model="input_proj_info" maxlength="150" show-word-limit
              style="position: relative; bottom: -5px">
            </el-input>
            <el-button style="position: relative; top: 10px" @click="EditProjInfo">修改</el-button>
          </span><br />
        </div>
      </div>
      <!--分割线-->
      <br><br>
      <el-divider><i class="el-icon-info"></i>&nbsp;DDL提醒小助手</el-divider>
      <div class="DDLContent">
        <div v-if="this.start < 0">
          <i class="el-icon-chat-line-round"></i>&nbsp;尊敬的<span style="color: #409EFF">{{this.$store.state.user_truename}}</span>,墨书小助手提醒您,项目还有<span style="color: #409EFF">{{ -this.start }}</span>天开始,你准备好了吗?
          <span style="font-size: 40px;"><b>₍₍٩( ᐛ )۶₎₎♪</b></span>
        </div>
        <div v-else-if="this.end < 0">
          <i class="el-icon-chat-line-round"></i>&nbsp;尊敬的<span style="color: #409EFF"></span>{{this.$store.state.user_truename}},墨书小助手提醒您,项目已经在<span style="color: #409EFF">{{ -this.end }}</span>天前结束,你完成任务了吗?<br>
          <span style="font-size: 40px;"><b>~\(≥▽≤)/~</b></span>
        </div>
        <div v-else>
          <i class="el-icon-chat-line-round"></i>&nbsp;尊敬的<span style="color: #409EFF">{{this.$store.state.user_truename}}</span>,墨书小助手提醒您,距离项目开始时间已经过了<span style="color: #409EFF">{{ this.start }}</span>天,距离项目结束还有<span style="color: #409EFF">{{ this.end }}</span>天.<br>
          <span style="font-size: 40px;"><b>|･ω･｀)</b></span>
        </div>
        <div style="text-align: center;position: relative;top: 5%;">
          墨书小助手提示您：<b>{{this.Motto[this.MottoI]}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'ProjectInfoView',
  data() {
    return {
      proj_name: '', //项目名称
      proj_creator: '', //项目创建者昵称
      proj_start: '', //项目开始时间
      proj_end: '', //项目结束时间
      proj_team: '', //所属团队名称
      proj_info: '', //项目简介
      proj_modify: 0, // 项目信息修改
      input_proj_name: '', //输入的项目名称
      input_proj_start: '', //输入的项目开始时间
      input_proj_end: '', //输入的项目结束时间
      input_proj_info: '', //输入的项目简介
      start: '', //今日距离开始时间的天数
      end: '', //今日距离项目结束时间的天数
      members: [], //用户列表
      proj_photo: '', //项目图片
      MottoI: 0,
      Motto: [
        '不饱食以终日,不弃功于寸阴',
        '逝者如斯夫，不舍昼夜',
        '人生天地之间，若白驹过隙，忽然而已',
        '盛年不重来，一日难再晨',
        '百年明日能几何，请君听我明日歌',
        '一年之计在于春,一日之计在于晨',
        '莫等闲，白了少年头，空悲切！'
      ],
    };
  },
  methods: {
    EditProjInfo() {
      //改版函数
      if (
        this.proj_name !== this.input_proj_name ||
        this.proj_start !== this.input_proj_start ||
        this.proj_end !== this.input_proj_end ||
        this.proj_info !== this.input_proj_info
      ) {
        if (this.input_proj_end <= this.input_proj_start) {
          this.$message.error('项目结束日期不得早于等于开始日期');
        } else {
          this.$axios
            .post(
              '/project/modifyProjInfo',
              qs.stringify({
                proj_id: this.$route.query.id,
                proj_name: this.input_proj_name,
                proj_info: this.input_proj_info,
                start_time: this.input_proj_start,
                end_time: this.input_proj_end,
              }),
              {
                headers: {
                  userid: this.$store.state.userid,
                  token: this.$store.state.token,
                },
              }
            )
            .then((res) => {
              if (res.data.errno === 0) {
                console.log(res.data); //测试一下
                this.proj_name = this.input_proj_name;
                this.proj_start = this.input_proj_start;
                this.proj_end = this.input_proj_end;
                this.proj_info = this.input_proj_info;
                this.$message.success('项目信息修改成功');
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      }
    },
    calculateStartEnd() {
      console.log(this.proj_start);
      console.log(this.proj_end);
      var START = new Date(this.proj_start);
      console.log(START);
      var END = new Date(this.proj_end);
      console.log(END);
      var NOW = new Date();
      console.log(NOW);
      this.start = Math.floor((NOW.getTime() - START.getTime()) / (24 * 3600 * 1000));
      this.end = Math.floor((END.getTime() - NOW.getTime()) / (24 * 3600 * 1000));
    },
    GetProjDetail() {
      this.$axios
        .post('/project/detail', qs.stringify({ proj_id: this.$route.query.id }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          },
        })
        .then((res) => {
          if (res.data.errno === 0) {
            this.proj_name = res.data.proj_name;
            this.proj_creator = res.data.proj_creator;
            this.proj_start = res.data.proj_start;
            this.proj_end = res.data.proj_end;
            this.proj_team = res.data.proj_team;
            this.proj_info = res.data.proj_info;
            this.members = res.data.members;
            this.proj_photo = res.data.proj_photo;
            this.calculateStartEnd();
            this.MottoI = Math.floor(Math.random() * 7);

          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
  mounted() {
    //获取项目相关信息
    this.GetProjDetail();
  },
  watch: {
    $route(to, from) {
      if (to.query.id !== from.query.id) {
        this.GetProjDetail();
      }
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}

#project {
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.04);
}

.DDLContent {}

.bottom {
  margin-top: 5px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(230, 230, 250);
}
</style>
