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

        <el-main :style="{ left: 200 - isCollapse * 144 + 'px' }">
          <br />
          <div
            style="width: 1200px; text-align: center; margin: 0 auto !important"
          >
            <el-tabs :tab-position="left" style="width: auto !important">
              <el-tab-pane label="课程介绍">
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
                      开课专业
                    </template>
                    {{ classInfo.college }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><office-building /></el-icon>
                      开课时间
                    </template>
                    {{ classInfo.openPeriod }}
                  </el-descriptions-item>
                </el-descriptions>
                <div style="margin: 25px 0">
                  <b class="StidentListTitle">选课学生列表</b>
                </div>
                <div style="width: 800px">
                  <el-table
                    class="StidentList"
                    :data="AllStudents"
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
                    <el-table-column
                      prop="studentName"
                      label="姓名"
                      align="center"
                    />
                    <el-table-column
                      prop="take.attendanceTimes"
                      label="考勤次数"
                      align="center"
                    />
                    <el-table-column
                      prop="take.isActive"
                      label="激活状态"
                      align="center"
                      :formatter="stateFormat"
                    />
                    <!-- <el-table-column label="操作" align="center">
                      <template #default>
                        <el-button type="text" size="small" @click="viewDetails"
                          >查看详情</el-button
                        >
                      </template> -->
                    <!-- </el-table-column> -->
                  </el-table>
                </div>
              </el-tab-pane>

              <el-tab-pane label="实验项目">
                <el-button
                  type="info"
                  class="plus"
                  size="large"
                  @click="createNewLab()"
                >
                  <el-icon><plus /></el-icon> 创建实验项目</el-button
                >
                <div
                  v-for="exp in this.experiment"
                  :key="exp"
                  class="text item"
                >
                  <el-card
                    class="box-card"
                    shadow="always"
                    style="height: 100px; width: 800px; text-align: left"
                    @click="goinExp(exp.id, this.otherTeaId, this.courseId)"
                  >
                    <el-icon
                      ><document-copy style="width: 1.5em; height: 1.5em"
                    /></el-icon>
                    <span style="font-size: 23px"
                      >&nbsp;&nbsp;{{ exp.name }}</span
                    >
                    <!-- <el-tag class="LabState" type="warning" style="float: left"
                      >待提交</el-tag
                    > -->
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
                <div style="margin: 25px 0"></div>

                <el-upload
                  ref="uploadRef"
                  class="upload-demo"
                  action=""
                  :http-request="changeFile"
                  :auto-upload="false"
                >
                  <template #trigger>
                    <el-button type="primary">选择文件</el-button>
                  </template>
                  <span>&nbsp;</span>
                  <el-button class="ml-3" type="success" @click="submitUpload"
                    >上传文件</el-button
                  >
                </el-upload>
              </el-tab-pane>

              <el-tab-pane label="课程通知">
                <!-- <div style="width: 1000px">
                  <el-table :data="courseMessage" style="width: 80%">
                    <el-table-column prop="createTime" label="日期" width="200" />
                    <el-table-column prop="id" label="发布人" width="200" />
                    <el-table-column prop="title" label="通知" />
                  </el-table>
                </div> -->
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
                        data.title
                          .toLowerCase()
                          .includes(search.toLowerCase())
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
                      <el-button size="mini" @click="viewDetails(scope.row.content)"
                        >查看详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div style="margin: 25px 0"></div>
                <el-button
                  type="info"
                  class="plus-notice"
                  size="large"
                  @click="dialogFormVisible = true"
                >
                  <el-icon><plus /></el-icon>发布课程通知</el-button
                >
                <el-dialog
                  title="发布课程通知"
                  v-model="dialogFormVisible"
                  :before-close="handleClose"
                >
                  <el-form>
                    <el-form-item label="通知标题" label-width="80px">
                      <el-input
                        v-model="CourseNotice.title"
                        placeholder="请输入通知标题"
                        show-word-limit
                        maxlength="15"
                        clearable
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="通知内容" label-width="80px">
                      <el-input
                        v-model="CourseNotice.content"
                        :autosize="{ minRows: 4, maxRows: 8 }"
                        type="textarea"
                        placeholder="请输入通知内容"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <!-- <div slot="footer" class="dialog-footer"> -->
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button
                        type="warning"
                        @click="dialogFormVisible = false"
                        style="float: left"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="publishCourseNotice"
                        >确认</el-button
                      >
                    </div>
                  </template>
                </el-dialog>
              </el-tab-pane>

              <el-tab-pane label="课程反馈">
 <el-table
                  :data="
                    AllFeedback.filter(
                      (data) =>
                        !search ||
                        data.studentId
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        data.studentName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                  "
                  :default-sort="{ prop: 'updateTime', order: 'descending' }"
                  stripe
                  style="text-align: center; width: 80%"
                >
                  <el-table-column type="expand">
                    <template #default="props">
                      <el-card class="Box-card center">
                        <template #header>
                          <div class="Card-header">
                            <b>{{ props.row.title }}</b>
                          </div>
                        </template>
                        <div class="Item">
                          {{ props.row.content }}
                        </div>
                      </el-card>
                      <!-- <el-descriptions title="" border :column="1">
                        <el-descriptions-item
                        lable="反馈标题"
                        label-align="center"
                        align="center"
                        width="10%"
                        >{{ props.row.title }}
                      </el-descriptions-item>
                        <el-descriptions-item
                          label="反馈内容"
                          label-align="center"
                          align="center"
                          width="10%"
                          >{{ props.row.content }}</el-descriptions-item
                        >
                      </el-descriptions> -->
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="title" label="反馈标题" /> -->
                  <el-table-column prop="studentId" label="学号" />
                  <el-table-column prop="studentName" label="姓名" />
                  <el-table-column
                    prop="updateTime"
                    sortable
                    label="提交时间"
                  />
                  <el-table-column align="right">
                    <template #header>
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="根据标题和反馈人姓名检索"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 20px;
}
.Card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
}
/* .text {
  font-size: 16px;
  align-self: auto;
} */
.Item {
  margin-bottom: 18px;
  text-align: center;
  text-align-last: left;
}
.Box-card {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* position:relative;
  right */
  text-align: center;
  width: 60%;
}
.StidentListTitle {
  position: relative;
  left: -550px;
}
.LabState {
  position: relative;
  right: -700px;
  bottom: -35px;
}
.plus-notice {
  position: relative;
  left: -200px;
}
.plus-experiment {
  position: relative;
  left: -120px;
}
.plus {
  position: relative;
  left: -200px;
}
.feedbackContent {
  position: relative;
  left: 300px;
  text-align: center;
  width: 60%;
}

.mark {
  font-size: 18px;
  color: #8c939d;
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
</style>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
export default {
  ElMessage,
  ElMessageBox,
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
      drawer,
      noticeText,
      handleOpen,
      handleClose,
    };
  },
  mounted() {
    this.teacherId = localStorage.getItem("id");
    this.courseId = this.$route.query.courseId;
    this.otherTeaId = this.$route.query.teacherId;
    this.userType = localStorage.getItem("type");
    console.log(this.courseId);
    const getMessage = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/notice/course", {
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
    const getClassInfo = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/course/teacher", {
          params: {
            teacherId: this.teacherId,
            courseId: this.courseId,
          },
        })
        .then((response) => {
          this.classInfo = response.data.data[0];
          console.log(this.classInfo);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getClassInfo();
    const getTeaInfo = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/user", {
          params: {
            id: this.teacherId,
            type: this.userType,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.Info = response.data.data;
        });
    };
    getTeaInfo();
    const getAllFeedback = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/course/feedback", {
          params: {},
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.AllFeedback = response.data.data;
            for (var i = 0; i < this.AllFeedback.length; i++) {
              this.AllFeedback[i].updateTime = this.rTime(
                this.AllFeedback[i].updateTime
              );
              this.AllFeedback[i].creatTime = this.rTime(
                this.AllFeedback[i].creatTime
              );
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getAllFeedback();
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
    const getAllStudents = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/course", {
          params: {
            courseId: this.courseId,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.AllStudents = response.data.data;
          }
        });
    };
    getAllStudents();
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
  },
  methods: {
    viewDetails(info) {
      this.noticeText = info;
      // this.noticeText = this.courseMessage[index].content;
      console.log("公告：" + this.noticeText);
      this.drawer = true;
    },
    //发布课程通知
    publishCourseNotice() {
      this.axios
        .post("http://139.224.65.105:9090/api/notice/course", {
          content: this.CourseNotice.content,
          courseId: this.courseId, // teacherId: this.teacherId,
          teacherId: this.teacherId,
          title: this.CourseNotice.title,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: "已发布新的课程公告",
              type: "success",
            });
            this.dialogFormVisible = false;
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
    createNewLab() {
      this.$router.push({
        path: "/tea/createLab",
        query: { courseId: this.courseId, otherTeaId: this.otherTeaId },
      });
    },
    goinExp(expid, teaid, courseid) {
      console.log(expid);
      this.$router.push({
        path: "/tea/LabCenter",
        query: { expId: expid, otherTeaId: teaid, courseId: courseid },
      });
    },
    Download(url) {
      window.location.href = url;
    },
    stateFormat(row) {
      if (row.take.isActive == 1) {
        return "已激活";
      } else {
        return "未激活";
      }
    },
    changeFile(file) {
      console.log("file", file);
      let fd = new FormData();
      fd.append("courseFile", file.file); // 传文件
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.axios.post(
        "http://139.224.65.105:9090/api/course/file/" +
          this.courseId +
          "/" +
          this.teacherId,
        fd,
        config
      );
    },
    submitUpload() {
      this.$refs.uploadRef.submit();
      this.$refs.uploadRef.clearFiles("success");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    rTime(time) {
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
      CourseNotice: {
        title: "",
        content: "",
      },
      dialogFormVisible: false, //发布课程通知
      AllStudents: [],
      AllFeedback: [{}],
      search: "",
      studentID: "",
      userType: "",
      teacherID: "",
      otherTeaId: "",
      courseId: "",
      url: "http://139.224.65.105:9090/api/",
      avatarUrl: require("../../../assets/unlogined.jpg"),
      Info: {
        name: "cfy",
        telephone: 18752426528,
        gender: "男",
        major: "软件工程",
        mailbox: "dearcfy@126.com",
      },
      classInfo: {},
      experiment: [],
      downloadFile: [],
      courseMessage: [],
    };
  },
};
</script>
