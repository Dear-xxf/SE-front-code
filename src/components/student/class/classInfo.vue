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
            :src="stuInfo.url"
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
                @click="
                  this.$router.push({
                    path: '/stu/personalInfo',
                  })
                "
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

        <el-main :style="{ left: 200 - isCollapse * 144 + 'px' }">
          <br />
          <div
            style="width: 1200px; text-align: center; margin: 0 auto !important"
          >
            <el-tabs :tab-position="left" style="width: auto !important">
              <el-tab-pane label="课程介绍">
                <!-- 考勤 -->
                <div style="width:100%;height:300px;float:left;">
                  <div style="float:left;">
                <el-result
                  v-if="this.isAttended"
                  icon="success"
                  title="今日已打卡"
                  :sub-title="this.lastTimeDescription"
                >
                </el-result>
                <el-result
                  v-if="!this.isAttended"
                  icon="warning"
                  title="今日未打卡"
                  :sub-title="this.lastTimeDescription"
                >
                  <template #extra>
                    <el-button type="primary" @click="punch()"
                      >点击签到</el-button
                    >
                  </template>
                </el-result>
                </div>

                <div style="margin:40px 600px 0px 0px;">
                <el-progress
                  class="progress"
                  v-if="this.isAttended"
                  type="dashboard"
                  status="success"
                  :percentage="
                    Math.floor((this.grade.attendanceTimes / 30) * 100)
                  "
                >
                  <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                    <span class="percentage-label">Progressing</span>
                  </template>
                </el-progress>
                <el-progress
                  class="progress"
                  v-if="!this.isAttended"
                  type="dashboard"
                  status="warning"
                  :percentage="
                    Math.floor((this.grade.attendanceTimes / 30) * 100)
                  "
                >
                  <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                    <span class="percentage-label">Progressing</span>
                  </template>
                </el-progress></div></div>

                <div style="clear:both;height:0px;"></div>
                <el-descriptions
                  class="margin-top"
                  title="任课教师"
                  :column="3"
                  border
                  style="width:60%;"
                >
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><user /></el-icon>
                      姓名
                    </template>
                    {{ teaInfo.name }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="2">
                    <template #label>
                      <el-icon><avatar /></el-icon>
                      性别
                    </template>
                    {{ teaInfo.gender }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><chat-line-square /></el-icon>
                      邮箱
                    </template>
                    {{ teaInfo.mailbox }}
                  </el-descriptions-item>
                </el-descriptions>

                <br /><br />
                <el-descriptions
                  class="margin-top"
                  title="课程简介"
                  :column="3"
                  border
                  style="width: 800px"
                >
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><user /></el-icon>
                      课程名称
                    </template>
                    {{ classInfo.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><CollectionTag /></el-icon>
                      课程学分
                    </template>
                    {{ classInfo.credit }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="2">
                    <template #label>
                      <el-icon><office-building /></el-icon>
                      上课地点
                    </template>
                    {{ classInfo.place }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><CollectionTag /></el-icon>
                      开课学院
                    </template>
                    {{ classInfo.college }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><clock /></el-icon>
                      开课时间
                    </template>
                    {{ classInfo.openPeriod }}
                  </el-descriptions-item>
                </el-descriptions>
              </el-tab-pane>

              <el-tab-pane label="实验项目">
                <div
                  v-for="exp in this.experiment"
                  :key="exp"
                  class="text item"
                >
                  <el-card
                    class="box-card"
                    shadow="always"
                    style="height: 100px; width: 800px; text-align: left"
                    @click="goinExp(exp.id, this.teacherId, this.courseId)"
                  >
                    <el-icon
                      ><document-copy style="width: 1.5em; height: 1.5em"
                    /></el-icon>
                    <span style="font-size: 23px"
                      >&nbsp;&nbsp;{{ exp.name }}</span
                    >
                  </el-card>
                </div>
              </el-tab-pane>

              <el-tab-pane label="课程资料">
                <div style="border: 1px solid black">
                  <div
                    v-for="download in this.downloadFile"
                    :key="download"
                    style="text-align: left"
                  >
                    <img
                      src="../../../assets/文档图片.png"
                      height="32"
                      width="26"
                      style="margin: 20px 20px 0px 0px"
                    />
                    <span @click="Download(download.url)">{{
                      download.name
                    }}</span
                    ><br />
                  </div>
                  <br /><br />
                </div>
              </el-tab-pane>

              <el-tab-pane label="对抗练习">
                <!-- <div style="width:1000px;">
                    <el-tag type="warning" style="float:left;">对抗练习</el-tag><br/><br/>
                    <div style="border:1px solid black;background-color:#f5f5f5;width:1000px;height:auto;">
                        <br/>
                        <div v-for="sub in this.practice" :key="sub" style="text-align:left;font-size:20px;">
                            <el-row>&nbsp;这是作业</el-row><hr/>
                        </div>
                    </div><br/></div> -->

                <!--<div style="width:1000px;" v-if="hasSubmitted.length>0">
                    <el-tag type="success" style="float:left;">已提交</el-tag><br/><br/>
                    <div style="border:1px solid black;background-color:#f5f5f5;width:1000px;height:auto;">
                        <br/>
                        <div v-for="sub in this.hasSubmitted" :key="sub" style="text-align:left;font-size:20px;">
                                <el-row>&nbsp;这是作业</el-row><hr/>
                        </div>
                    </div><br/></div>

                    <div style="width:1000px;" v-if="noSubmit.length>0">
                    <el-tag type="danger" style="float:left;">未提交</el-tag><br/><br/>
                    <div style="border:1px solid black;background-color:#f5f5f5;width:1000px;height:auto;">
                        <br/>
                        <div v-for="sub in this.noSubmit" :key="sub" style="text-align:left;font-size:20px;">
                                <el-row>&nbsp;这是作业</el-row><hr/>
                        </div>
                    </div></div> -->
                <div>
                  <el-card class="practice-box-card">
                    <template #header>
                      <div class="practice-card-header">
                        <h style="font-size: 25px">对抗练习规则说明</h>
                      </div>
                    </template>
                    <span style="display: flex">
                      1.在对抗练习中，多人同时作答</span
                    ><br />
                    <span style="display: flex"
                      >2.率先答对5题的同学获得2分，排名第二的同学获得1分</span
                    ><br />
                    <span style="display: flex"
                      >3.在有同学答对5题之后，对抗练习结束</span
                    >
                  </el-card>
                  <br /><br />
                  <router-link
                    :to="{
                      path: '/practice',
                      query: {
                        courseId: this.courseId,
                        teacherId: this.teaInfo.id,
                      },
                    }"
                  >
                    <el-button type="primary"> 开始对抗练习 </el-button>
                  </router-link>
                </div>
              </el-tab-pane>

              <el-tab-pane label="课程通知">
                <el-drawer
                  v-model="drawer"
                  v-if="drawer == true"
                  title="课程公告详情"
                  direction="rtl"
                  :before-close="handleClose"
                >
                  <em style="float: left">{{ this.noticeText }}</em>
                </el-drawer>
                <el-table
                  :data="
                    courseMessage.filter(
                      (data) =>
                        !search ||
                        data.title.toLowerCase().includes(search.toLowerCase())
                    )
                  "
                  :default-sort="{ prop: 'createTime', order: 'descending' }"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column prop="title" label="课程通知标题" />
                  <el-table-column prop="createTime" sortable label="发布时间">
                    <template #default="props">
                      {{ rTime(props.row.createTime) }}
                    </template>
                  </el-table-column>
                  <el-table-column align="right">
                    <template #header>
                      <el-input
                        v-model="search"
                        size="small"
                        placeholder="根据标题进行检索"
                      />
                    </template>
                    <template v-slot="scope">
                      <el-button
                        size="mini"
                        @click="viewDetails(scope.row.content)"
                        >查看详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="课程反馈">
                <div class="mark">反馈标题</div>
                <el-input
                  class="feedbackTitle"
                  v-model="this.FeedbackTitle"
                  size="large"
                  placeholder="请输入反馈主题.."
                  :autosize="{ minRows: 1, maxRows: 2 }"
                  maxlength="20"
                  clearable
                />
                <div style="margin: 25px 0"></div>
                <div class="mark">反馈内容</div>
                <el-input
                  class="feedbackContent"
                  v-model="this.FeedbackContent"
                  size="large"
                  :autosize="{ minRows: 12, maxRows: 20 }"
                  type="textarea"
                  maxlength="100"
                  placeholder="请输入你对课程的建议.."
                  show-word-limit
                  clearable
                />
                <div style="margin: 25px 0"></div>
                <div>
                  <el-tag
                    v-show="this.finishedFeedback"
                    class="FeedbackTime"
                    type="success"
                    >最后修改时间：{{
                      this.rTime(this.FeedbackUpdateTime)
                    }}</el-tag
                  >
                  <el-button
                    v-show="!this.finishedFeedback"
                    class="Feedback"
                    type="primary"
                    @click="this.submitFeedback"
                    >提交反馈</el-button
                  >
                  <el-button
                    v-show="this.finishedFeedback"
                    class="Feedback"
                    type="success"
                    @click="this.updateFeedback"
                    >更新反馈</el-button
                  >
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.mark {
  font-size: 18px;
  color: #8c939d;
}
.feedbackTitle {
  /* position: absolute;
  left: 240px;
  top: 20px; */
  top: 10px;
  width: 60%;
}
/* .FeedbackTime {
  position: absolute;
  top: 350px;
  left: 0px;
}
.Feedback {
  position: absolute;
  top: 350px;
  right: 125px;
} */
.FeedbackTime {
  position: relative;
  /* top: 350px; */
  left: -195px;
}
.Feedback {
  position: relative;
  /* top: 400px; */
  right: -195px;
}
.feedbackContent {
  top: 10px;
  width: 60%;
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
  position: absolute;
  top: 110px;
  right: 0px;
  bottom: 0;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 0px;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: auto;
}
.practice-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.practice-text {
  font-size: 14px;
}
.practice-box-card {
  width: 900px;
  display: inline-block;
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
    const drawer = ref(false);
    const noticeText = ref();
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (done) => {
      done();
    };
    return {
      isCollapse,
      handleOpen,
      drawer,
      noticeText,
      handleClose,
    };
  },
  mounted() {
    this.studentId = localStorage.getItem("id");
    this.courseId = this.$route.query.courseId;
    this.teacherId = this.$route.query.teacherId;
    console.log(this.courseId);
    const getClassInfo = () => {
      this.axios
        .get(this.url + "course/" + this.studentId + "/" + this.courseId)
        .then((response) => {
          this.classInfo = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getClassInfo();
    //得到个人信息
    const getPersonalInfo = () => {
      this.axios
        .get(this.url + "student/studentId/" + this.studentId)
        .then((response) => {
          this.stuInfo = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getPersonalInfo();
    //得到教师信息
    const getTeacherInfo = () => {
      this.axios
        .get(this.url + "user", {
          params: {
            id: this.teacherId,
            type: "教师",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.teaInfo = response.data.data;
        });
    };
    getTeacherInfo();
    //得到实验
    const getExp = () => {
      this.axios
        .get(this.url + "experiment", {
          params: {
            courseId: this.courseId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.experiment = response.data.data;
        });
    };
    getExp();
    //得到文件
    const getFile = () => {
      this.axios
        .get(this.url + "course/file", {
          params: {
            courseId: this.courseId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.downloadFile = response.data.data;
        });
    };
    getFile();
    //得到课程信息
    const getMessage = () => {
      this.axios
        .get(this.url + "notice/course", {
          params: {
            courseId: this.courseId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.courseMessage = response.data.data;
        });
    };
    getMessage();
    //考勤
    const getAttendance = () => {
      //获取已考勤次数、上次考勤时间
      this.axios
        .get(
          "http://139.224.65.105:9090/api/grade/get/" +
            this.studentId +
            "/" +
            this.courseId
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.lastTimeDescription =
              "上次打卡时间：" +
              this.rTime(response.data.data.take.lastAttendanceTime);
            this.grade.attendanceTimes =
              response.data.data.take.attendanceTimes;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        });
      //判断能否考勤
      this.axios
        .get(
          "http://139.224.65.105:9090/api/course/judgeSignIn/" +
            this.studentId +
            "/" +
            this.courseId
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            if (response.data.data == true) {
              this.isAttended = false;
            } else {
              this.isAttended = true;
            }
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          this.$message({
            message: error,
            type: "error",
          });
        });
    };
    getAttendance();
    //反馈
    const getFeedback = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/course/feedback", {
          params: {
            courseId: this.courseId,
            studentId: this.studentId,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.Feedback = response.data.data[0];
            this.FeedbackTitle = this.Feedback.title;
            this.FeedbackContent = this.Feedback.content;
            this.FeedbackUpdateTime = this.Feedback.updateTime;
            this.finishedFeedback = true;
          } else {
            this.finishedFeedback = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getFeedback();
  },
  methods: {
    viewDetails(info) {
      this.noticeText = info;
      // this.noticeText = this.courseMessage[index].content;
      console.log("公告：" + this.noticeText);
      this.drawer = true;
    },
    //打卡考勤
    punch() {
      this.axios
        .get(
          "http://139.224.65.105:9090/api/course/signIn/" +
            this.studentId +
            "/" +
            this.courseId
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            //考勤成功
            this.$message({
              message: response.data.message,
              type: "success",
            });
            this.isAttended = true;
            this.grade.attendanceTimes += 1;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
    submitFeedback() {
      this.axios
        .post("http://139.224.65.105:9090/api/course/feedback", {
          content: this.FeedbackContent,
          courseId: this.courseId,
          studentId: this.studentId,
          title: this.FeedbackTitle,
          creatTime: "",
          updateTime: "",
          id: 0,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: "感谢你对课程建设的建议！",
              type: "success",
            });
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        });
    },
    updateFeedback() {
      this.axios
        .put("http://139.224.65.105:9090/api/course/feedback", {
          content: this.FeedbackContent,
          courseId: this.courseId,
          studentId: this.studentId,
          title: this.FeedbackTitle,
          creatTime: "",
          updateTime: "",
          id: this.Feedback.courseFeedbackId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: "感谢你对课程建设的建议！",
              type: "success",
            });
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
          }
        });
    },
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    Download(url) {
      console.log(url)
      window.location.href = url;
    },
    goinExp(expid, teaid, courseid) {
      console.log(expid);
      this.$router.push({
        path: "/stu/LabCenter",
        query: { expId: expid, teacherId: teaid, courseId: courseid },
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
      search: "",
      lastTimeDescription: "",
      grade: {
        attendanceTimes: 0,
        // experimentsScore: 0,
        // practicesScore: 0,
      },
      isAttended: false,
      url: "http://139.224.65.105:9090/api/",
      avatarUrl: require("../../../assets/unlogined.jpg"),
      courseId: "",
      stuInfo: {},
      studentId: "",
      teacherId: "",
      teaInfo: {},
      classInfo: {},
      experiment: [],
      downloadFile: [],
      practice: [],
      courseMessage: [],
      finishedFeedback: false,
      Feedback: {},
      FeedbackTitle: "",
      FeedbackContent: "",
      FeedbackUpdateTime: "",
    };
  },
};
</script>
