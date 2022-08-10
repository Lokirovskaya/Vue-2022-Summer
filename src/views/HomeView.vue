<template>
  <div id="background">
    <div id="homepage">
      <div id="header">
        <p style="font-size:30px;position: relative;top: 2%;left: 1%;"><b>INK BOOK</b></p>
      </div>
      <div id="container1" style="background-image: url(../assets/back.png);background-size: 100%; height: 650px;;">
        <span style="font-size: 50px ;position: relative; top: 120px;margin-left: 5%;"><b>团队合作</b></span><br>
        <span style="font-size: 60px ;position: relative; bottom: 230px;;margin-left: 5%;"><b>墨书让工作更高效</b></span>
        <img id="IMG" src="../assets/呃呃.png">
        <span id="introduce">
          <p>
            本产品(代号"墨书")的定位是为校内外中小团队的项目协作开发提供管理服<br>务。具备管理团队，管理项目等功能，涉及项目产品原型设计、文档共享编<br>辑等。同时，本站还站在用户的角度，注重用户的隐私性、操作方便性。
          </p>
          <el-button type="primary" @click="goto_login" v-show="this.$store.state.login_state === 0"> 开始 </el-button>
        </span>
      </div>
    </div>
    <br><br>
    <div id="funcIntroduce">
      <p style="font-size:30px;"><b><span style="color: #4F87EA">功&nbsp;能</span>&nbsp;介&nbsp;绍</b></p>
      <p style="color: #4F87EA;position: relative; bottom: 35px;"><b>____ _ ___</b></p>
      <div class="cardBox">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div class="cardImg">
                <img src="../assets/1.png">
              </div>
              <div class="cardIntro">
                <span style="position: relative;bottom: 20px;"><b>原型设计</b></span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div class="cardImg">
                <img src="../assets/2.png">
              </div>
              <div class="cardIntro">
                <span style="position: relative;bottom: 20px;"><b>UML图</b></span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div class="cardImg">
                <img src="../assets/3.png">
              </div>
              <div class="cardIntro">
                <span style="position: relative;bottom: 20px;"><b>共享文档</b></span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <br><br>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
    }

  },

  components: {},

  methods: {
    goto_login() {
      this.$router.push({ path: '/login' });
    }
  },
};
</script>

<style scoped>
#homepage {
  background: #d0e5fb none repeat scroll center top;
  background-size: auto;
  text-align: left;
  position: relative;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
}


.box-card {
  width: 332px;
  height: 600px;
  background-color: #DEEEFC;
}

.cardImg {
  width: 312px;
  height: 560px;
  background-color: white;
  position: relative;
  bottom: 10px;
  right: 10px;
}

.cardIntro {
  width: 312px;
  height: 20px;
  background-color: white;
  position: relative;
  bottom: 10px;
  right: 10px;
  text-align: center;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #D3E5FB;
}

.cardBox {
  margin-left: 10%;
  margin-right: 10%;
}

#funcIntroduce {
  width: 100%;
  text-align: center;
}

#left {
  width: 50%;
  height: 100%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #FFF;
  padding-right: 1px;
}

#right {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-left: 20px;
  padding-bottom: 20px;
}

#IMG {
  width: 600px;
  height: 420px;
  position: relative;
  left: 320px;
}

#introduce {
  color: #677294;
  font-size: 14px;
  position: relative;
  bottom: 35%;
  left: 5%;
}
</style>
