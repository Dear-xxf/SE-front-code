<template>
  <div>
    <el-container>
      <el-header>
        <a href="https://www.tongji.edu.cn/">
          <img src="../../../assets/tjlogo.png" />
        </a>

        <span class="title">同济大学实验课程管理</span>

        <div class="profile">
          <el-avatar
            :size="size"
            :fit="fit"
            :src=Info.url
            @error="errorHandler"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" style="margin: 7px auto" />
          </el-avatar>
        </div>
      </el-header>

      <el-container>
        <el-aside>
          <br /><br />
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon
                  ><location style="width: 1.3em; height: 1.3em"
                /></el-icon>
                <span>个人信息</span>
              </template>
              <el-menu-item
                index="1-1"
                @click="
                  this.$router.push({
                    path: '/tea/personalInfo',
                  })
                "
                >个人主页</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon
                  ><collection style="width: 1.3em; height: 1.3em"
                /></el-icon>
                <span>我的课程</span>
              </template>
              <el-menu-item index="2-1" @click="this.$router.push('/tea/CourseCenter')"
                >课程列表</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon
                  ><bell-filled style="width: 1.3em; height: 1.3em"
                /></el-icon>
                <span>通知中心</span>
              </template>
              <el-menu-item
                index="3-1"
                @click="this.$router.push('/messageCenter')"
                >系统公告</el-menu-item
              >
            </el-sub-menu>

            <el-menu-item index="4" @click="this.$router.push('/Calendar')">
              <el-icon><clock style="width: 1.3em; height: 1.3em" /></el-icon>
              <template #title>日历</template>
            </el-menu-item>
            <br /><br /><br />
            <el-menu-item index="5" @click="changeIsCollapse()">
              <el-icon><setting style="width: 1.3em; height: 1.3em" /></el-icon>
              <template #title>展开/收缩</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-row :gutter="10" justify="center">
            <el-col :span="14">
              <div class="grid-content bg-purple-dark">
                <span style="font-size: 16px, margin: 10px">实验名称</span>
                <el-input v-model="NewLab.name" placeholder="" />
              </div>
            </el-col>
            <el-col :span="14">
              <el-descriptions title="" :column="4" border>
                <!-- <el-descriptions-item
                  label="创建人"
                  label-align="center"
                  align="center"
                  >{{ NewLab.teacherId }}</el-descriptions-item
                > -->
                <el-descriptions-item
                  label="实验分值"
                  label-align="center"
                  align="center"
                >
                  <el-input-number 
                    v-model="NewLab.experimentScore" 
                    :step="1"
                  />
                </el-descriptions-item>
                <el-descriptions-item
                  label="截止时间"
                  label-align="center"
                  align="center"
                >
                  <el-date-picker
                    v-model="NewLab.experimentDeadline"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-descriptions-item>
              </el-descriptions>
            </el-col>
            <el-col class="details" :span="14">
              <el-divider style="font-size: 50px" content-position="center">
                实验目的
              </el-divider>
              <p>
                <el-input
                  v-model="NewLab.experimentPurpose"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  type="textarea"
                  placeholder="请输入实验目的"
                />
              </p>
              <el-divider content-position="center"> 实验内容 </el-divider>
              <p>
                <el-input
                  v-model="NewLab.experimentContent"
                  :autosize="{ minRows: 5, maxRows: 10 }"
                  type="textarea"
                  placeholder="请输入实验内容"
                />
              </p>
              <el-divider content-position="center"> 实验备注 </el-divider>
              <p>
                <el-input
                  v-model="NewLab.experimentRemarks"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="请输入实验备注"
                />
              </p>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-button type="primary" @click="creatNewLab()">确认创建</el-button>
          <el-button type="warning" @click="Back()">取消</el-button>
        </el-main>
      </el-container>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.details {
  text-align: left;
}

.labName {
  font-size: 20px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.el-row {
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-header {
  background-color: #427fc5;
  height: 100px !important;
  position: relative;
}
.el-aside {
  background-color: rgb(250, 250, 250);
  color: var(--el-text-color-primary);
  text-align: center;
  position: relative;
  height: calc(100vh - 100px);
  margin: 0;
  padding: 0;
  display: block;
  width: auto !important;
  left: 0;
  top: 0px;
  bottom: 0;
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
.title {
  color: white;
  font-size: 25px;
  font-family: "Microsoft YaHei";
  position: absolute;
  top: 35%;
  left: 20%;
}
.profile {
  position: absolute;
  top: 35%;
  right: 30px;
}
.el-radio-group {
  position: absolute;
  bottom: 10%;
  margin: 0 auto;
  padding: 1rem;
}
.el-menu {
  width: 55px;
  background: rgb(250, 250, 250);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-footer {
  background-color: #427fc5;
  /* height: 86px !important; */
  position: relative;
  text-align: center;
}
</style>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { ref } from "vue";

export default {
  Location,
  Document,
  IconMenu,
  Setting,

  setup() {
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
    };
  },

  methods: {
    Back(){
      this.$router.push({path:"/tea/classInfo",query:{courseId:this.courseId,teacherId:this.otherTeaId}})
    },
    creatNewLab() {
      this.axios
        .post("http://139.224.65.105:9090/api/experiment", {
          courseId: this.courseId,
          createTime: "",
          experimentContent: this.NewLab.experimentContent,
          experimentDeadline: this.NewLab.experimentDeadline,
          experimentPurpose: this.NewLab.experimentPurpose,
          experimentRemarks: this.NewLab.experimentRemarks,
          experimentScore: this.NewLab.experimentScore,
          id: "",
          name: this.NewLab.name,
          teacherId: this.teacherId,
          updateTime: ""
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: response.data.message,
              type: "success",
            });
            this.$router.push({path:"/tea/classInfo",query:{courseId:this.courseId,teacherId:this.otherTeaId}})
            return true;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
            return false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },
  },

  data() {
    return {
      NewLab: {
        courseId: this.courseId,
        createTime: "",
        otherTeaId:"",
        experimentContent: "",
        experimentDeadline: "",
        experimentPurpose: "",
        experimentRemarks: "",
        experimentScore: 0,
        id: "",
        name: "",
        teacherId: this.teacherId,
        updateTime: ""
      },
      teacherId: 300001,
      experiment_id:"",
      studentId: 200000,
      courseId:"",
      userType:"",
      Info:{},
    };
  },
  mounted(){
    this.courseId=this.$route.query.courseId
    this.teacherId=localStorage.getItem('id')
    this.userType=localStorage.getItem('type')
    this.otherTeaId=this.$route.query.otherTeaId
    const getTeaInfo=()=>{
      this.axios.get("http://139.224.65.105:9090/api/user",{
          params:{
            id:this.teacherId,
            type:this.userType
          }
        })
        .then((response)=>{
          console.log(response.data.data)
          this.Info=response.data.data
        })
    };
    getTeaInfo()
  }
};
</script>
