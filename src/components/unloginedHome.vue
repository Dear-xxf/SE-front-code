<template>
    <div class="MyHome">
    <el-container style="height:100%;" direction="vertical">

      <el-header>
        <a href="https://www.tongji.edu.cn/">
        <img src="../assets/tjlogo.png" style="margin:7px auto;">
        </a>
        
        <span class="title">同济大学实验课程管理</span>
        <router-link to="/login"><b class="login">请先登录</b></router-link>
        <router-link to="/login"><span class="info">个人信息</span></router-link>
        <router-link to="/login"><span class="class">我的课程</span></router-link>
        <router-link to="/login"><span class="message">通知中心</span></router-link>
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
        <br/>
        <div class="block">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in 5" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>


        <div class="homeTitle1_bg">
          <h2 class="homeTitle1">
            <span class="homeTitle1-text" >实验室管理通知</span>
          </h2>
          <br/><br/>
        </div>

        <div class="messagetable">
        <el-table :data="tableData" stripe style="width: 85%" :cellstyle="rowStyle" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column prop="title" label="通知" width="400"/>
          <el-table-column prop="name" label="发布人" />
          <el-table-column prop="date" label="日期"/>
        </el-table>
        </div>
        <router-link to="/login">
        <span>查看全部通知</span>
        </router-link>         
      </el-main>
      <br/><br/>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

// indepedent css
<style scoped>
.el-footer {
  background-color: #ced2d6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.el-header{
  background-color:#427fc5;
  height: 100px!important;
  position: relative
} 
.el-main {
  background-color: white;
  color: var(--el-text-color-primary);
  text-align: center;
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
.login{
  color:black;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:45%;
  left:75%
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
.homeTitle1_bg{
    background: none no-repeat;
    width: 700px;
    height: 140px;
    margin:0 auto;
    background-size: cover; 
    position: relative;
    margin-bottom: 20px;
}
.homeTitle1{
    position: absolute;
    top: 70px;
    left:50%;
    width: 600px;
    margin-left: -300px;
    text-align: center;
    color:#427fc5
}
.homeTitle1-text:before{
    display: inline-block;
    position: relative;
    top:-5px;
    right: 30px;
    content: "";
    width: 200px;
    height: 0px;
    border: 2px solid black;
}
.homeTitle1-text:after{
    display: inline-block;
    position: relative;
    top:-5px;
    left: 30px;
    content: "";
    width: 200px;
    height: 0px;
    border: 2px solid black;
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
.messagetable{
  margin:0px 0px 20px 240px;
}



</style>



<script>
  export default {
    data () {
      return {
        url: "http://139.224.65.105:9090/api",
        circleUrl: require("../assets/unlogined.jpg"),
        size: "small",
        tableData: [],
      }
    },
    methods: {
      errorHandler() {
        return true
      },
    mounted(){
        const btn = () => {
            this.axios.get(this.url+'/notice/system')
            .then((response) => {
                for(let i = 0; i < Math.max(5, length(response.data)); i++){
                    let item = response.data.data[i]; 
                    this.tableData.push(item) 
                }
                })
                .catch(function (error) {
                     console.log(error);
                     })
        }
        btn()
    }
  }
}
</script>
