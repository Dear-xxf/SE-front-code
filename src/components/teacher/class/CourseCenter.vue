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
          <el-dialog
            title="创建课程"
            v-model="dialogFormVisible"
            :before-close="handleClose"
          >
            <el-form :model="form">
              <el-form-item label="课程名称" label-width="80px">
                <el-input
                  v-model="NewCourse.name"
                  auto-complete="off"
                  placeholder="请输入课程名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="上课地点" label-width="80px">
                <el-input
                  v-model="NewCourse.place"
                  auto-complete="off"
                  placeholder="请输入上课地点"
                ></el-input>
              </el-form-item>

              <el-form-item label="开课时间" label-width="80px">
                <el-input
                  v-model="NewCourse.open_period.week"
                  style="width: 30%"
                  size="small"
                  auto-complete="off"
                  placeholder=""
                >
                  <template #prepend>星期</template>
                </el-input>
                <el-input
                  v-model="NewCourse.open_period.period"
                  style="width: 30%"
                  size="small"
                  auto-complete="off"
                  placeholder=""
                  :suffix-icon="Calendar"
                >
                  <template #append>节</template>
                </el-input>
                <el-input
                  v-model="NewCourse.open_period.range"
                  style="width: 40%"
                  size="small"
                  auto-complete="off"
                  placeholder=""
                  :suffix-icon="Calendar"
                >
                  <template #prepend>[</template>
                  <template #append>]</template>
                  <template #suffix>
                    <el-icon class="el-input__icon"><calendar /></el-icon>
                  </template>
                </el-input>
              </el-form-item>

              <!-- <el-form-item label="开课时间" label-width="80px">
                <el-input
                  v-model="NewCourse.open_period"
                  size="small"
                  auto-complete="off"
                  placeholder="请输入开课时间"
                  :suffix-icon="Calendar"
                >
                  <template #prepend>周</template>
                  <template #append>节</template>
                  <template #suffix>
                    <el-icon class="el-input__icon"><calendar /></el-icon>
                  </template>
                </el-input>
              </el-form-item> -->

              <div style="margin: 20px"><em>成绩比例</em></div>
              <el-form-item label="考勤" label-width="120px">
                <el-input-number
                  v-model="NewCourse.score_ratio.attendance"
                  size="small"
                  :step="0.1"
                  :max="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="实验项目" label-width="120px">
                <el-input-number
                  v-model="NewCourse.score_ratio.experiment"
                  size="small"
                  :step="0.1"
                  :max="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="对抗练习" label-width="120px">
                <el-input-number
                  v-model="NewCourse.score_ratio.practice"
                  size="small"
                  :step="0.1"
                  :max="1"
                ></el-input-number>
              </el-form-item>

              <div style="margin: 20px"></div>
              <el-form-item label="学分数" label-width="80px">
                <el-input-number
                  v-model="NewCourse.credit"
                  :step="0.5"
                  step-strictly
                ></el-input-number>
              </el-form-item>

              <el-form-item label="开课学院" label-width="80px">
                <el-input
                  v-model="NewCourse.college"
                  auto-complete="off"
                  placeholder="请选择开课学院"
                ></el-input>
                <!-- <el-autocomplete
                  v-model="NewCourse.college"
                  :fetch-suggestions="querySearch"
                  popper-class="my-autocomplete"
                  placeholder="请选择开课学院"
                  @select="handleSelect"
                >
                  <template #suffix>
                    <el-icon class="el-input__icon" @click="handleIconClick">
                      <edit />
                    </el-icon>
                  </template>
                  <template #default="{ item }">
                    <div class="value">{{ item.value }}</div>
                    <span class="link">{{ item.link }}</span>
                  </template>
                </el-autocomplete> -->
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
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <!-- <el-button type="primary" @click="saveEvent">确 定</el-button> -->
                <el-button type="primary" @click="creatNewCourse"
                  >确认</el-button
                >
              </div>
            </template>
          </el-dialog>

          <el-space wrap>
            <el-card
              v-for="item in this.tableData"
              :key="item"
              shadow="hover"
              :body-style="{ padding: '0px' }"
              @click="clickCard(item.id, item.teacherId)"
            >
              <template #header>
                <img
                  :src= item.coursePic
                  class="image"
                />
                <div class="card-header" style="padding: 20px">
                  <span>{{ item.name }} {{ item.id }}</span>
                  <br />
                  <span>{{ item.college }}</span>
                </div>

                <el-link :underline="false">
                  <el-tag type="success" size="small"> 点击查看详情 </el-tag>
                </el-link>
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
                    >讨论</el-link
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
            <!-- 创建课程 -->
            <el-card :body-style="{ padding: '110px 57px' }">
              <div style="padding: 14px">
                <b style="font-size: 20px">创建课程</b>
              </div>
              <div style="margin: 30px">
                <time class="time">{{ currentDate }}</time>
                <el-button
                  type="text"
                  class="button"
                  @click="dialogFormVisible = true"
                  ><el-icon size="100px"><plus /></el-icon
                ></el-button>
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
.newCourseButton {
  position: relative;
  margin: 20px;
  // right: -500px;
  // bottom: -100px;
}
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
    const dialogFormVisible = ref(false);
    const size = ref("default");
    const dialogVisible = ref(false);
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("确认取消创建新课程？")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      dialogFormVisible,
      size,
      dialogVisible,
      isCollapse,
      handleOpen,
      handleClose,
    };
  },

 methods: {
   clickCard(courseId, teacherId){
     this.$router.push({path:"/tea/classInfo",query:{courseId:courseId,teacherId:teacherId}})
   },
    creatNewCourse() {
      //错误检测
      if (
        this.NewCourse.score_ratio.attendance +
        this.NewCourse.score_ratio.experiment +
        this.NewCourse.score_ratio.practice != 1
      ) {
        this.$message({
          message: "成绩比例之和不为1！",
          type: "error",
        });
        return;
      }
      this.axios
        .post("http://139.224.65.105:9090/api/course/addCourse", {
          college: this.NewCourse.college,
          credit: this.NewCourse.credit,
          name: this.NewCourse.name,
          openPeriod:
            "星期" +
            this.NewCourse.open_period.week +
            this.NewCourse.open_period.period +
            "节" +
            " " +
            "[" +
            this.NewCourse.open_period.range +
            "]",
          place: this.NewCourse.place,
          scoreRatio:
            this.NewCourse.score_ratio.attendance.toString() +
            "," +
            this.NewCourse.score_ratio.experiment.toString() +
            "," +
            this.NewCourse.score_ratio.practice.toString(),
          teacherId: this.teacherId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: response.data.message,
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
      teacherId: 300001,
      Info:{},
      userType:"",
      courseId: 60006,
      studentId: 200000,
      NewCourse: {
        name: "",
        place: "",
        open_period: {
          week: "",
          period: "",
          range: "",
        },
        score_ratio: {
          attendance: 0,
          experiment: 0,
          practice: 0,
        },
        credit: 0,
        college: "",
      },
      tableData: [],
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
    this.teacherId=localStorage.getItem('id')
    this.userType=localStorage.getItem('type')
    console.log(this.userType)
    this.axios
      .get("http://139.224.65.105:9090/api/course/teacher", {
        params: {
          teacherId: this.teacherId,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          this.tableData = response.data.data;
          return true;
        } else {
          return false;
        }
      })
      .then(()=>{
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].coursePic=this.coursePic[i]
        }
      });
    const getTeaInfo=()=>{
      this.axios.get("http://139.224.65.105:9090/api/user",{
          params:{
            id:this.teacherId,
            type:this.userType
          }
        })
        .then((response)=>{
          this.Info=response.data.data
        })
    };
    getTeaInfo()
  }
})
</script>