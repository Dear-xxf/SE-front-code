 <template>
  <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
  <div>
    <el-container>
      <el-header>
        <a href="https://www.tongji.edu.cn/">
          <img src="../assets/tjlogo.png" style="margin: 7px auto" />
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
              <el-menu-item index="2-1" @click="this.$router.push('/stu/CourseCenter')"
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
          <div
            v-if="isSuccess == 0"
            v-loading="1"
            :element-loading-svg="svg"
            class="custom-loading-svg"
            element-loading-svg-view-box="-15, -15, 55, 55"
            element-loading-text="正在寻找对局..."
            :data="tableData"
            style="width: 100%; height: 80%"
          ></div>
          <div v-else>
            <div v-for="item in this.team" :key="item">
              <h style="display: flex; font-size: 20px; width: 80%">
                <el-progress
                  :text-inside="true"
                  :stroke-width="30"
                  :percentage="item.grade"
                  style="width: 60%"
                  :color="item.color"
                />
                &nbsp;&nbsp;{{ item.userName }}<br /><br />
              </h>
            </div>
            <br />
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <h style="font-size: 20px">{{
                    problemData[this.proNum].stem
                  }}</h
                  ><br />
                  <el-button class="button" type="text" @click="click()"
                    >下一题</el-button
                  >
                </div>
              </template>
              <div
                v-for="item in this.problemData[this.proNum].options"
                :key="item"
              >
                <!-- <span style="font-size:20px;float:left;">{{item.key}}.&nbsp;&nbsp;{{item.value}}</span><br/><br/> -->
                <el-radio
                  style="font-size: 20px; float: left"
                  v-model="curAnswer"
                  :label="item.key"
                  size="large"
                  >{{ item.key }}.&nbsp;&nbsp;{{ item.value }}</el-radio
                ><br /><br />
                <!-- <el-radio style="font-size:20px;float:left;" v-model="curAnswer" label= 2 size="large">{{item.key}}.&nbsp;&nbsp;{{item.value}}</el-radio><br/><br/> -->
              </div>
              <!-- <el-radio-group v-model="curAnswer">
                  <el-radio 
                    v-for="item in this.problemData[this.proNum].options"
                    :key="item">
                    {{item.key}}.&nbsp;&nbsp;{{item.value}}
                  </el-radio>
                </el-radio-group> -->
            </el-card>
            <br /><br />
            <!-- <el-button type="success" @click="click()">click </el-button> -->
          </div>

          <el-table
            :data="AnswerSituation"
            style="position: absolute; left: 1000px; top: 150px; width: 30%"
          >
            <el-table-column prop="Num" label="题号" width="80px;" />
            <el-table-column prop="isRight" label="答题情况" width="80px;" />
            <el-table-column prop="name" label="题目" />
          </el-table>
        </el-main>
      </el-container>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>



 <style lang="scss" scoped>
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.box-card {
  width: 50%;
  // display:inline-block;
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
    const Close = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?").then(() => {
        done();
      });
    };
    return {
      dialogVisible,
      isCollapse,
      Close,
    };
  },

  methods: {
    finalSituation() {
      console.log(222);
      let content;
      let title;
      if (this.finalRank == 1) {
        content = "恭喜你获胜！获得2分，点击返回页面";
        title = "答题情况";
        this.axios.post("http://139.224.65.105:9090/api/grade/practice/"+this.studentId+"/"+this.courseId,{},{
          params: {
            grade : 2
          },
        })
      } 
      else if(this.finalRank == 2){
        content = "可惜，请再接再厉！获得1分，点击返回页面";
        title = "答题情况";
        this.axios.post('http://139.224.65.105:9090/api/grade/practice/'+this.studentId+'/'+this.courseId,{},{
          params:{
            "grade":1
          },
        })
      }
      else{
        content = "可惜，请再接再厉！获得0分，点击返回页面";
        title = "答题情况";
      }
      this.$alert(content, title, {
        confirmButtonText: "OK",
        callback: action => {
          console.log(action)
          this.$router.push({
            path: "/stu/classInfo",
            query: { courseId: this.courseId, teacherId: this.teacherId },
          });
      },
      });
    },
    initWebSocket() {
      this.courseId = this.$route.query.courseId;
      this.teacherId = this.$route.query.teacherId;
      this.studentId = localStorage.getItem("id");
      (this.Socket = new WebSocket(
        "ws://139.224.65.105:9090/server/" +
          this.studentId +
          "/" +
          this.courseId
      )),
        (this.Socket.onopen = this.webSocketopen);
      this.Socket.onmessage = this.webSocketOnmessage;
    },
    judgeRank() {
      for (let i = 0; i < this.team.length; i++) {
        if (this.team[i].correctNum > this.correctNum) {
          this.finalRank = this.finalRank + 1;
        }
      }
    },
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },
    webSocketopen: function () {
      console.log("成功连接");
    },
    webSocketOnmessage: function (message) {
      console.log(message);
      if (message.data === "连接成功") {
        console.log("成功");
      }
      // else if(JSON.parse(message.data).practice!=null){
      else {
        console.log("收到数据");
        this.isSuccess = 1;
        this.problemData = JSON.parse(message.data).practice.problems;
        this.team = JSON.parse(message.data).teamUserInfos;
        for (let i = 0; i < this.team.length; i++) {
          if (this.team[i].userId == this.studentId) {
            this.correctNum = this.team[i].correctNum;
            this.rightOrWrong = this.team[i].rightOrWrong;
            this.proNum = this.team[i].rightOrWrong.length;
            if (this.AnswerSituation.length === 0) {
              for (let j = 0; j < this.team[i].rightOrWrong.length; j++) {
              // console.log(this.team[i].rightOrWrong.length)
                if(this.team[i].rightOrWrong[j] === 1) {
                  let answerSituation1 = {
                    Num: j + 1,
                    name: this.problemData[j].stem,
                    isRight: "正确",
                  };
                  // console.log(answerSituation1)
                  this.AnswerSituation.push(answerSituation1);
                }
                else {
                  let answerSituation2 = {
                    Num: j + 1,
                    name: this.problemData[j].stem,
                    isRight: "错误",
                  };
                  // console.log(answerSituation2)
                  this.AnswerSituation.push(answerSituation2);
                }
              }
            }
          }
          if (this.team[i].correctNum === 5) {
            this.isFinished = 1;
            console.log(333);
          }
          this.axios
            .get(
              "http://139.224.65.105:9090/api/student/studentId/" +
                this.team[i].userId
            )
            .then((response) => {
              this.team[i].userName = response.data.data.name;
            });
          this.team[i].grade = this.team[i].correctNum * 20;
        }
        this.teamId = JSON.parse(message.data).teamId;
        console.log(this.teamId);
        this.team[0].color = "blue";
        this.team[1].color = "green";
        this.team[2].color = "red";
        if (this.isFinished === 1) {
          this.judgeRank();
          this.finalSituation();
          this.isFinished = 0;
        }
      }
      // else{
      //   this.team=JSON.parse(message.data).teamUserInfos
      //   console.log(this.team)
      //   for(let i=0;i<this.team.length;i++)
      //   {
      //     if(this.team[i].userId==this.studentId){
      //       this.correctNum = this.team[i].correctNum
      //       this.rightOrWrong = this.team[i].rightOrWrong
      //     }
      //     if(this.team[i].correctNum===5){
      //       this.isFinished=1
      //       console.log(333)
      //     }
      //     this.axios.get('http://139.224.65.105:9090/api/student/studentId/'+this.team[i].userId)
      //       .then((response) => {
      //         this.team[i].userName=response.data.data.name
      //           })
      //     this.team[i].grade=this.team[i].correctNum*20
      //   }
      //   this.teamId = JSON.parse(message.data).teamId
      //   console.log(this.teamId)
      //   this.team[0].color="blue"
      //   this.team[1].color="green"
      //   this.team[2].color="red"
      //   if(this.isFinished===1){
      //     this.judgeRank()
      //     this.finalSituation()
      //     this.isFinished=0
      //   }
      // }
    },
    click() {
      console.log(this.correctNum);
      if (this.curAnswer != this.problemData[this.proNum].reference.key) {
        this.curAnswer = "";
        this.rightOrWrong.push(0);
        let answerSituation = {
          Num: this.proNum + 1,
          name: this.problemData[this.proNum+1].stem,
          isRight: "错误",
        };
        this.AnswerSituation.push(answerSituation);
        this.proNum = this.proNum + 1;
      } else {
        this.rightOrWrong.push(1);
        let info = {
          teamId: this.teamId,
          userId: this.studentId,
          correctNum: this.correctNum + 1,
          rightOrWrong: this.rightOrWrong,
        };
        this.Socket.send(JSON.stringify(info));
        this.curAnswer = "";
        let answerSituation = {
          Num: this.proNum + 1,
          name: this.problemData[this.proNum+1].stem,
          isRight: "正确",
        };
        this.AnswerSituation.push(answerSituation);
        this.proNum = this.proNum + 1;
      }
    },
  },

  data() {
    return {
      finalRank: 1,
      isFinished: 0,
      curAnswer: "",
      svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
      teamId: "",
      Socket: null,
      rightOrWrong: [],
      team: [],
      proNum: 0,
      isSuccess: 0,
      studentId: "",
      tableData: [],
      Info: {},
      problemData: [],
      changeData: [],
      AnswerSituation: [],
    };
  },
  unmounted() {
    console.log("断开连接");
    this.Socket.close();
  },
  mounted: function () {
    this.initWebSocket();
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
