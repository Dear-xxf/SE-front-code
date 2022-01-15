<template>
  <div>
    <el-container>
      <el-header>
        <a href="https://www.tongji.edu.cn/">
          <img src="../../../assets/tjlogo.png" style="margin: 7px auto" />
        </a>

        <span class="title">同济大学实验课程管理</span>

        <div class="profile">
          <el-avatar
            :size="size"
            :fit="fit"
            :src="Info.url"
            @error="errorHandler"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
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
                @click="this.$router.push('/stu/personalInfo')"
                >个人主页</el-menu-item
              >
              <el-menu-item
                index="1-2"
                @click="this.$router.push('/stu/changeStudentInfo')"
                >修改信息</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon
                  ><collection style="width: 1.3em; height: 1.3em"
                /></el-icon>
                <span>我的课程</span>
              </template>
              <el-menu-item
                index="2-1"
                @click="this.$router.push('/stu/CourseCenter')"
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
          <el-row justify="center">
            <el-col :span="14">
              <div class="grid-content bg-purple-dark">
                <el-link
                  ><b class="labName">{{ expData.name }}</b></el-link
                >
              </div>
            </el-col>
            <el-col :span="14">
              <el-descriptions title="" :column="4" border>
                <el-descriptions-item
                  label="项目名称"
                  label-align="center"
                  align="center"
                  >{{ expData.name }}</el-descriptions-item
                >
                <el-descriptions-item
                  label="创建人"
                  label-align="center"
                  align="center"
                  >{{ expData.teacherName }}</el-descriptions-item
                >
                <el-descriptions-item
                  label="实验分值"
                  label-align="center"
                  align="center"
                >
                  <el-tag size="small">{{ expData.experimentScore }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                  label="截止时间"
                  label-align="center"
                  align="center"
                  ><el-icon><clock /></el-icon>
                  {{ expData.experimentDeadline }}</el-descriptions-item
                >
              </el-descriptions>
            </el-col>
            <el-col class="details" :span="14">
              <el-divider style="font-size: 50px" content-position="center"
                >实验目的</el-divider
              >
              <p>{{ expData.experimentPurpose }}</p>
              <el-divider content-position="center">实验内容</el-divider>
              <p>{{ expData.experimentContent }}</p>
              <el-divider content-position="center">实验备注</el-divider>
              <p>{{ expData.experimentRemarks }}</p>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-upload
            ref="upload"
            action=""
            :http-request="changeFile"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-button
              class="ml-3"
              type="success"
              @click="submitUpload"
              v-if="this.isSubmitted === 0"
              >上传作业</el-button
            >
            <el-button class="ml-3" type="success" @click="submitUpload" v-else
              >更新作业</el-button
            ><br /><br/>
            <el-button v-if="this.isSubmitted === 1" @click="downloadMyFile()" >查看我的作业</el-button>
          </el-upload>
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
    const size = ref("default");
    const isCollapse = ref(true);
    return {
      size,
      isCollapse,
    };
  },

  methods: {
    downloadMyFile(){
      console.log(this.myFileUrl)
      window.location.href = this.myFileUrl;
    },
    changeFile(file) {
      let fd = new FormData();
      fd.append("file", file.file); // 传文件
      console.log(file)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("http://139.224.65.105:9090/api/experiment/work/" + this.expId +"/" +this.studentId)
      if (this.isSubmitted === 0) {
        this.axios.post(
            "http://139.224.65.105:9090/api/experiment/work/" +
              this.expId +
              "/" +
              this.studentId,
            fd,
            config,
          )
          .then((response) => {
            console.log(response);
          });
      } else {
        this.axios
          .put(
            "http://139.224.65.105:9090/api/experiment/work/" +
              this.expId +
              "/" +
              this.studentId,
              fd,
              config,
          )
          .then((response) => {
            console.log(response);
          });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    transferTime(time) {
      var d = new Date(time);
      var times =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
        "-" +
        (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
        " " +
        (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
        ":" +
        (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
        ":" +
        (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
      // var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return times;
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
      isSubmitted: 0,
      studentId: "",
      expId: "",
      teacherId: "",
      courseId: "",
      Info: {},
      expData: {},
      myFileUrl: "",
    };
  },

  mounted: function () {
    this.studentId = localStorage.getItem("id");
    this.expId = this.$route.query.expId;
    this.courseId = this.$route.query.courseId;
    this.teacherId = this.$route.query.teacherId;
    this.axios
      .get("http://139.224.65.105:9090/api/experiment", {
        params: {
          experimentId: this.expId,
        },
      })
      .then((response) => {
        if (response.data.code == 200) {
          this.expData = response.data.data[0];
          this.expData.experimentDeadline = this.transferTime(
            this.expData.experimentDeadline
          );
          return true;
        } else {
          return false;
        }
      })
      .then(() => {
        getTeaInfo();
      });
    let id = localStorage.getItem("id");
    const btn = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/student/studentId/" + id)
        .then((response) => {
          this.Info = response.data.data;
        });
    };
    btn();
    const getTeaInfo = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/user", {
          params: {
            id: this.expData.teacherId,
            // id:300001,
            type: "教师",
          },
        })
        .then((response) => {
          this.expData.teacherName = response.data.data.name;
        });
    };
    const judgeIsSubmitted = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/experiment/work", {
          params: {
            experimentId: this.expId,
            studentId: this.studentId,
          },
        })
        .then((response) => {
          console.log(response.data.data)
          if (response.data.data.length === 0) {
            console.log(response.data.data[0].url)
            this.isSubmitted = 0;
          } else {
            this.isSubmitted = 1;
            this.myFileUrl = response.data.data[0].url;
            console.log(this.myFileUrl)
          }
        });
    };
    judgeIsSubmitted();
  },
};
</script>
