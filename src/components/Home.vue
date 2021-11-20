<template>
    <div class="common-layout">
    <el-container style="height:100%" direction="vertical">

      <el-header>
        <a href="https://www.tongji.edu.cn/">
        <img src="../assets/tjlogo.png">
        </a>
        
        <span class="title">同济大学实验课程管理</span>
        <router-link to="/login"><span class="info">个人信息</span></router-link>
        <router-link to="/myClass"><span class="class">我的课程</span></router-link>
        <router-link to="/messageCenter"><span class="message">通知中心</span></router-link>
        <span class="gang">|</span>
        <div class="profile">
        <el-avatar :size="size" :fit="fit" :src="circleUrl" @error="errorHandler">
          <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        </div>
        
      </el-header>
        
      <el-main style="height:300;flex-grow:1;">
        <div class="block">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in 5" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>


        <div class="cfytitle1_bg">
          <h2 class="cfytitle1">
            <span class="cfytitle1-text" >实验室管理通知</span>
          </h2>
          <br/><br/>
        </div>


        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>





      </el-main>
    </el-container>
  </div>
</template>



<style>
html,
body,
#app,
.common-layout,
.el-container{
  padding:0px;
  margin:0px;
  height:100%;
}
.profile{
  position:absolute;
  top:35%;
  right: 30px;
}
.title{
  color:white;
  font-size: 25px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:35%;
  left:20%
}
.info{
  color:white;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:40%;
  left:80%
}
.class{
  color:white;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:40%;
  left:85%
}
.message{
  color:white;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:40%;
  left:90%
}
.gang{
  color:white;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:38%;
  left:95%
}
.el-header{
  background-color:#427fc5;
  height: 86px!important;
  position: relative
}
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  width:300%
}

.el-main {
  background-color: white;
  color: var(--el-text-color-primary);
  text-align: center;
}
.cfytitle1_bg{
    background: none no-repeat;
    width: 700px;
    height: 180px;
    margin:0 auto;
    background-size: cover; 
    position: relative;
    margin-bottom: 20px;
}
.cfytitle1{
    position: absolute;
    top: 70px;
    left:50%;
    width: 600px;
    margin-left: -300px;
    text-align: center;
    color:#427fc5
}
.cfytitle1-text:before{
    display: inline-block;
    position: relative;
    top:-5px;
    right: 30px;
    content: "";
    width: 200px;
    height: 0px;
    border: 2px solid black;
}
.cfytitle1-text:after{
    display: inline-block;
    position: relative;
    top:-5px;
    left: 30px;
    content: "";
    width: 200px;
    height: 0px;
    border: 2px solid black;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}



</style>



<script>
  export default {
    data () {
      return {
        circleUrl: require("../assets/profile2.jpg"),
        size: "small",
        tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
      }
    },
    methods: {
      errorHandler() {
        return true
      }
    }
  }
</script>
