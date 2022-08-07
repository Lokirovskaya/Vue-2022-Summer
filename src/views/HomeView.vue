<template>
<div id="background">
  <div class="home">
    <br>
      <div id="title">墨书</div>
      <div id="title2">M&nbsp;O&nbsp;S&nbsp;H&nbsp;U&nbsp;</div>
      <br><br>
      <!-- <el-divider></el-divider> -->
      <div id="carousel">
<el-carousel :interval="4000" type="card" height="400px" left="10px">
    <el-carousel-item v-for="item in pics" :key="item">
      <!-- <div>{{item.sentence}}</div> -->
      <img
          ref="images"
          :src="require('../assets/' + item.photo)"
          class="img"
        >
    </el-carousel-item>
  </el-carousel>
      </div>
  <br><br><br>
  <div v-if="this.$store.state.login_state === 0">
  <el-button type="warning" plain @click="goto_login">登录/注册</el-button>
  </div>
  <br><br>
  </div>
</div>
  
</template>

<script>
  export default {
    name: 'HomeView',
    data(){
      return{
        pics:[{photo:'1.jpg',sentence:'管理您的项目和团队'},{photo:'2.jpg',sentence:'轻松设计原型图'},{photo:'3.jpg',sentence:'支持多人在线编辑'}],
        imageHeight: 400,

      }
    
    },
    
    components: {},

    methods: {
      goto_login(){
        this.$router.push({path:'/login'});
      }
    },
  };
</script>

<style scoped>
  body {
    /* background-color: #FAF0E6; */
    margin:0;
  padding:0;
  border:0
  }
  #carousel {
    /* display: flex; */
    justify-content:center;
    margin-left: 15px;
    margin-right: 15px;

  }
  #background {
    background:url("../assets/homeview_bk.jpg");
  width:100%;
  height:100%;
  /* position:fixed; */
  background-size:100% 100%;
  /* opacity :0.8 */
  }
  .el-carousel__item h3 {
    /* color: #475669; */
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
   #title {
    width: 100%;
    height: 80px;
    font-family: "微软雅黑";
    font-size: 52px;
    /* color: rgb(80, 80, 80); */
    color: #2F4F4F;
    font-weight: 900;
    letter-spacing: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
  }
  #title2 {
    width: 100%;
    height: 10px;
    font-family: "微软雅黑";
    font-size: 10px;
    /* color: rgb(80, 80, 80); */
    color: #2F4F4F;
    font-weight: 900;
    letter-spacing: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    opacity: 0.6;
  }
</style>
