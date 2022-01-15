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
          <el-row
            v-for="item in this.tableData"
            :key="item"
            :gutter="10"
            justify="center"
          >
            <el-col :span="14">
              <div class="grid-content bg-purple-dark">
                <el-link
                  ><b class="labName">{{ item.name }}</b></el-link
                >
              </div>
            </el-col>
            <el-col :span="14">
              <el-descriptions title="" :column="4" border>
                <el-descriptions-item
                  label="创建人"
                  label-align="center"
                  align="center"
                  >{{ item.teaName }}</el-descriptions-item
                >
                <el-descriptions-item
                  label="实验分值"
                  label-align="center"
                  align="center"
                >
                  <el-tag size="small">{{ item.experimentScore }}</el-tag>
                </el-descriptions-item>
                <!-- update -->
                <el-descriptions-item
                  label="截止时间"
                  label-align="center"
                  align="center"
                  ><el-icon><clock /></el-icon><br /><em>{{
                    rTime(item.experimentDeadline)
                  }}</em></el-descriptions-item
                >
              </el-descriptions>
            </el-col>
            <el-col class="details" :span="14">
              <el-divider style="font-size: 50px" content-position="center"
                >项目目的</el-divider
              >
              <p>{{ item.experimentPurpose }}</p>
              <el-divider content-position="center">项目内容</el-divider>
              <p>{{ item.experimentContent }}</p>
              <el-divider content-position="center">项目备注</el-divider>
              <p>{{ item.experimentRemarks }}</p>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <div style="margin: 25px 0">
            <b class="StidentListTitle">已提交报告</b>
          </div>
          <div class="" style="width: 800px">
            <el-table
              class="StidentList"
              :data="LabStu"
              :default-sort="{ prop: 'studentId', order: 'descending' }"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="studentId"
                label="学号"
                align="center"
              />
              <el-table-column prop="studentName" label="姓名" align="center" />
              <el-table-column
                prop="updateTime"
                label="上传时间"
                align="center"
              >
                <template #default="scope">
                  <div style="align-items: center">
                    <span style="margin: 0px">
                      {{ rTime(scope.row.updateTime) }}
                    </span>
                    <el-icon><timer /></el-icon>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="url" label="报告链接" align="center">
                <template #default="scope">
                  <div style="align-items: center">
                    <el-link type="primary" @click="downloadFile(scope.row.url)"
                      >点击查看</el-link
                    >
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="项目分数" align="center">
                <template #default="scope">
                  <el-input-number
                    v-model="scope.row.studentScore"
                    :disabled="isDsiabled"
                    size="small"
                    :min="0"
                    :max="scope.row.experimentScore"
                    :step="1"
                    controls-position="right"
                  />
                </template>
              </el-table-column>

              <el-table-column label="评分操作" align="center">
                <template #default="scope">
                  <el-button
                    size="small"
                    v-if="isDsiabled"
                    type="primary"
                    @click="isDsiabled = false"
                    ><el-icon :size="15"> <edit /></el-icon>
                  </el-button>
                  <el-button
                    size="small"
                    v-if="!isDsiabled"
                    type="danger"
                    @click="isDsiabled = true"
                    ><el-icon :size="15"> <circle-close-filled /></el-icon>
                  </el-button>
                  <el-button
                    size="small"
                    v-if="!isDsiabled"
                    type="success"
                    @click="
                      grade(
                        scope.row.studentId,
                        scope.row.experimentId,
                        scope.row.studentScore
                      )
                    "
                    ><el-icon :size="15"><circle-check-filled /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>



<style lang="scss" scoped>
.StidentList {
  position: relative;
  right: -310px;
}
.StidentListTitle {
  position: relative;
  left: -380px;
}
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
  Edit,
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { ref } from "vue";

export default {
  Edit,
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
    //评分
    grade(studentId, experimentId, studentScore) {
      this.axios
        .post(
          "http://139.224.65.105:9090/api/grade/" +
            studentId +
            "/" +
            experimentId,
          {},
          {
            params: {
              grade: studentScore,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: response.data.message,
              type: "success",
            });
            return true;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
          console.log(error);
        });
      this.isDsiabled = true;
    },

    downloadFile(url) {
      window.location.href = url;
    },
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
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
      isDsiabled: true,
      LabStu: [],
      Info:{},
      userType:"",
      expId:"",
      courseId:"",
      tableData: [{}],
    };
  },

  mounted() {
    this.courseId=this.$route.query.courseId
    this.otherTeaId=this.$route.query.otherTeaId
    this.expId=this.$route.query.expId
    this.teacherId=localStorage.getItem('id')
    this.userType=localStorage.getItem('type')
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
    const getotherTeaInfo=()=>{
      this.axios.get("http://139.224.65.105:9090/api/user",{
          params:{
            id:this.tableData[0].teacherId,
            type:this.userType
          }
        })
        .then((response)=>{
          console.log(response.data.data)
          this.tableData[0].teaName=response.data.data.name
        })
    };
    //项目详情
    const getLabDetail = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/experiment/", {
          params: {
            courseId: this.courseId,
            experimentId:this.expId,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            console.log(this.tableData);
            getotherTeaInfo()
            return true;
          } else {
            return false;
          }
        });
    };
    getLabDetail();

    //提交项目报告的学生列表
    const getLabStu = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/experiment/work", {
          params: {
            experimentId: this.expId,
            studentId: "",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.LabStu = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getLabStu();
  },
};
</script>
