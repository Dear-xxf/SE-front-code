<template>
  <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
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

        <el-main>
          <el-space wrap>
            <el-card
              v-for="item in this.tableData"
              :key="item"
              shadow="hover"
              :body-style="{ padding: '0px' }"
              @click="
                clickCard(
                  item.isActive,
                  item.courseId,
                  item.courseInfo.rTeacherId
                )
              "
            >
              <template #header>
                <img
                  :src= item.coursePic
                  class="image"
                />
                <div class="card-header" style="padding: 20px">
                  <span>{{ item.courseInfo.name }} {{ item.courseId }}</span>
                  <br />
                  <span>{{ item.courseInfo.college }}</span>
                </div>

                <el-link v-if="item.isActive != 0" :underline="false">
                  <el-tag type="success" size="small">
                    已激活，点击查看详情
                  </el-tag>
                </el-link>

                <el-button
                  type="danger"
                  plain
                  size="mini"
                  @click="dialog(item.courseId)"
                  v-if="item.isActive == 0"
                >
                  未激活，点击进行激活
                </el-button>
              </template>
              <div class="bottom">
                <p>
                  <el-icon :size="15" style="margin-right: 10px"
                    ><message
                  /></el-icon>
                  <el-link type="primary" :disabled="item.isActive == 0"
                    >公告</el-link
                  >
                  <el-icon
                    :size="15"
                    style="margin-left: 20px; margin-right: 10px"
                    ><document /></el-icon
                  ><el-link type="success" :disabled="item.isActive == 0"
                    >作业</el-link
                  >
                </p>
                <p>
                  <el-icon :size="15" style="margin-right: 10px"
                    ><chat-line-round /></el-icon
                  ><el-link type="info" :disabled="item.isActive == 0"
                    >反馈</el-link
                  >
                  <el-icon
                    :size="15"
                    style="margin-left: 20px; margin-right: 10px"
                    ><folder /></el-icon
                  ><el-link type="warning" :disabled="item.isActive == 0"
                    >文件</el-link
                  >
                </p>
              </div>
            </el-card>
          </el-space>

          <el-dialog
            v-model="dialogVisible"
            title="激活"
            :before-close="handleClose"
          >
            <el-form :model="form">
              <el-form-item label="邮箱" label-width="80px">
                <el-input
                  v-model="form.mailbox"
                  auto-complete="off"
                  placeholder="请输入你的邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" label-width="80px">
                <el-input
                  v-model="form.inputCode"
                  auto-complete="off"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item>
            </el-form>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false" style="float: left"
                  >Cancel</el-button
                >
                <el-button type="primary" @click="sendCode()">发送</el-button>
                <el-button type="primary" @click="activate()">确认</el-button>
              </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>



<style lang="scss" scoped>
.card-header {
  // display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
}
.bottom {
  margin-top: 13px;
  margin-bottom: 13px;
  line-height: 25px;
  // display: flex;
  // justify-content: space-between;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
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

.el-row {
  margin-bottom: 20px;
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { ElMessageBox } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  Location,
  Document,
  IconMenu,
  Setting,

  setup() {
    const dialogVisible = ref(false);
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    // const handleClose = (key, keyPath) => {
    //   console.log(key, keyPath);
    // };
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      dialogVisible,
      isCollapse,
      handleOpen,
      handleClose,
    };
  },

  methods: {
    dialog(courseId) {
      this.dialogVisible = true;
      this.courseId = courseId;
      console.log(this.courseId)
    },
    clickCard(isActive, courseId, teacherId) {
      if (isActive != 0) {
        this.$router.push({
          path: "/stu/classInfo",
          query: { courseId: courseId, teacherId: teacherId },
        });
        console.log(courseId, teacherId);
      }
    },
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },

    sendCode() {
      if (this.form.mailbox == "") {
        this.$message({
          message: "邮箱不能为空",
          type: "error",
        });
        return;
      }
      this.axios
        .post(
          "http://139.224.65.105:9090/api/user/email/send",
          {},
          {
            params: {
              courseId: this.courseId,
              studentMailbox: this.form.mailbox,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.form.authCode = response.data.data;
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
            return false;
          }
        });
    },

    activate() {
      if (this.form.authCode == this.form.inputCode) {
        this.axios
          .post(
            "http://139.224.65.105:9090/api/course/enableActive/"+this.studentId+'/'+this.courseId,
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.code == 200) {
              this.$message({
                message: "课程已成功激活！",
                type: "success",
              });
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].courseId == this.courseId) {
                  this.tableData[i].isActive = 1;
                  break;
                }
              }
              this.dialogVisible = false;
              return true;
            } else {
              this.$message({
                message: response.data.message,
                type: "error",
              });
              return false;
            }
          });
      }
    },
  },

  data() {
    return {
      courseId: "",
      form: {
        mailbox: "",
        authCode: "",
        inputCode: "",
      },
      studentId: "",
      tableData: [],
      Info: {},
      coursePic:[
        require("../../../assets/课程图片1.png"),
        require("../../../assets/课程图片2.png"),
        require("../../../assets/课程图片3.png"),
        require("../../../assets/课程图片4.png"),
        require("../../../assets/课程图片5.png"),
        require("../../../assets/课程图片6.png"),
        require("../../../assets/课程图片7.png"),
      ],
    };
  },

  mounted: function () {
    this.studentId = localStorage.getItem("id");
    this.axios
      .get("http://139.224.65.105:9090/api/student/takes/" + this.studentId)
      .then((response) => {
        if (response.data.code == 200) {
          this.tableData = response.data.data;
        }
        console.log(this.tableData);
      })
      .then(() => {
        for (let i = 0; i < this.tableData.length; i++) {
          for (
            let j = 0;
            j < this.tableData[i].courseInfo.teacherInfo.length;
            j++
          ) {
            if (
              this.tableData[i].courseInfo.teacherInfo[j].characterName ==
              "责任教师"
            ) {
              this.tableData[i].courseInfo.rTeacherId =
                this.tableData[i].courseInfo.teacherInfo[j].teacherId;
              console.log(this.tableData[i].courseInfo.rTeacherId);
            }
          }
        }
      })
      .then(()=>{
        for(let k=0;k<this.tableData.length;k++)
        {
          this.tableData[k].coursePic=this.coursePic[k]
        }
      });
    const btn = () => {
      this.studentId = localStorage.getItem("id");
      this.axios
        .get(
          "http://139.224.65.105:9090/api/student/studentId/" + this.studentId
        )
        .then((response) => {
          console.log(response.data.data);
          this.Info = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    btn();
  },
});
</script>
