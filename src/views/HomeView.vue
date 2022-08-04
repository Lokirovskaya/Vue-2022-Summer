<template>
  <div class="home">
      <!-- <img class="background" src="../assets/主页.jpg"> -->
      <div id="title">墨书团队协作与管理平台</div>
      <!-- <el-divider></el-divider> -->
<el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in pics" :key="item">
      <!-- <div>{{item.sentence}}</div> -->
      <img
          ref="images"
          :src="require('../assets/' + item.photo)"
          class="img"
        >
    </el-carousel-item>
  </el-carousel>
  <!-- <el-divider></el-divider>
  <br><br><br> -->
  <el-divider>
    <div style="font-size: 10px; color: gray;">2022 软工小学期 小组9</div>
  </el-divider>
  <br>
  <!-- <div id="title">墨书团队协作与管理平台</div> -->
  <!-- <img src="pics.url"> -->
  </div>
  
</template>

<script>
  export default {
    name: 'HomeView',
    data(){
      return{
        //   pics:[
        // {url:'../assets/主页.jpg'},
        // {url:'../assets/主页.jpg'},
        // {url:'../assets/主页.jpg'},],
        pics:[{photo:'1.jpg',sentence:'管理您的项目和团队'},{photo:'2.jpg',sentence:'轻松设计原型图'},{photo:'3.jpg',sentence:'支持多人在线编辑'}],
        // sentences:['']
        imageHeight: 400,

      }
    
    },
      

    components: {},

    methods: {},
  };
</script>

<style scoped>
  .background {
    background:url("../assets/主页.jpg");
  width:100%;
  height:100%;
  position:fixed;
  /* background-size:cover; */
  }
  .el-carousel__item h3 {
    /* color: #475669; */
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item{
    /* background-color: yellow; */
    /* background-color: yellow; */
  }
   #title {
    width: 100%;
    height: 110px;
    font-size: 52px;
    color: #484455;
    font-weight: bolder;
    letter-spacing: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>
