<template>
  <div>
    <el-container>
      <el-header>
            <a href="https://www.tongji.edu.cn/">
            <img src="../assets/tjlogo.png" style="margin:7px auto;">
            </a>
        
            <span class="title">同济大学实验课程管理</span>

            <div class="profile">
                <el-avatar :size="size" :fit="fit" :src=Info.url @error="errorHandler">
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
                    path: this.typeRoute+'/personalInfo',
                  })
                "
                >个人主页</el-menu-item
              >
              <el-menu-item
                index="1-2"
                v-if="typeRoute==='/stu'"
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
              <el-menu-item index="2-1" @click="this.$router.push(this.typeRoute+'/CourseCenter')"
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
         <el-main :key="this.isChange">
          <!-- <div id="calendar" /> -->

          <!-- <button @click="toggleWeekends">toggle weekends</button> -->
          <FullCalendar :options="calendarOptions" />
          <el-dialog
            :title="optTitle"
            v-model="dialogFormVisible"
            :before-close="handleClose"
          >
            <el-form :model="form">
              <el-form-item label="事件名称" label-width="80px">
                <el-input
                  v-model="form.title"
                  auto-complete="off"
                  placeholder="请输入事件名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始时间" label-width="80px">
                <el-date-picker
                  v-model="form.start"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" label-width="80px">
                <el-date-picker
                  v-model="form.end"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer"> -->
            <template #footer>
              <div class="dialog-footer">
                <el-button
                  type="warning"
                  @click="delEvent"
                  v-if="form.id"
                  style="float: left"
                  >删 除</el-button
                >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="saveEvent">确 定</el-button> -->
                <el-button v-if="!form.id" type="primary" @click="saveEvent"
                  >确认提交</el-button
                >
                <el-button v-if="form.id" type="primary" @click="updateEvent"
                  >确认修改</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
.is-selected {
  color: #1989fa;
}

.el-header{
  background-color:#427fc5;
  height: 100px!important;
  position: relative
} 
.el-aside {
  background-color: rgb(250, 250, 250);
  color: var(--el-text-color-primary);
  text-align: center;
  position:relative;
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
</style>


<script>
// import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
// import { ElMessageBox } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  Location,
  Document,
  IconMenu,
  Setting,

  setup() {
    const dialogFormVisible = ref(false);
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    //表单弹出后，点击表单以外的范围可触发 handleClose
    const handleClose = (done) => {
      done();
    };

    return {
      dialogFormVisible,
      isCollapse,
      handleOpen,
      handleClose,
    };
  },

  methods: {
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },

    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    //获取事件列表
    getEventsList(info) {
      var ret = [];
      this.axios
        .get("http://139.224.65.105:9090/api/event", {
          params: {
            beginDate: info.start,
            endDate: info.end,
          },
        })
        .then((response) => {
          console.log("success!");
          // console.log(info.start);
          console.log(response.data.data);

          console.log("test 1!");
          console.log(typeof(this.calendarOptions.events));
          console.log(this.calendarOptions.events.length);
          for (var k = 0; k < this.calendarOptions.events.length; k++) {
            console.log(this.calendarOptions.events[k]);
          }

          var list = response.data.data.events;
          for (var i = 0; i < list.length; i++) {
            ret.push({
              id: list[i].id,
              title: list[i].title,
              start: list[i].startTime,
              end: list[i].endTime,
            });
          }
          this.calendarOptions.events = ret;

          console.log("test 2!");
          console.log(typeof(this.calendarOptions.events));
          console.log(this.calendarOptions.events.length);
          for (var m = 0; m < this.calendarOptions.events.length; m++) {
            console.log(this.calendarOptions.events[m]);
          }
        })
        .catch(() => {
          console.log("error");
        });
    },

    //触发日期点击
    handleDateClick(arg) {
      this.dialogFormVisible = true;
      this.optTitle = "新增事件";
      this.form.title = "";
      this.form.id = "";
      this.form.start = arg.date;
      this.form.end = arg.date;
      console.log(arg.date);
    },

    //触发事件点击
    handleEventClick(info) {
      info.el.style.borderColor = "red";
      this.dialogFormVisible = true;
      this.optTitle = "修改事件";
      this.form = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
      };
    },

    //保存事件
    saveEvent() {
      console.log({
          startTime: this.form.start,
          endTime: this.form.end,
          id: 0,
          studentId: this.studentId,
          title: this.form.title,
          createTime: "",
          updateTime: "",
        });
      this.axios
        .post("http://139.224.65.105:9090/api/event", {
          startTime: this.form.start,
          endTime: this.form.end,
          id: 0,
          studentId: this.studentId,
          title: this.form.title,
          createTime: "",
          updateTime: "",
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
            this.dialogFormVisible = false;
          }
        });
      // this.isChange += 1;
      // location.reload();
      this.$route.replace({
        path: '',
        name: 'white'
      })
    },

    //修改事件
    updateEvent() {
      this.axios
        .put("http://139.224.65.105:9090/api/event", {
          startTime: this.form.start,
          endTime: this.form.end,
          id: this.form.id,
          studentId: this.studentId,
          title: this.form.title,
          createTime: "",
          updateTime: "",
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
            this.dialogFormVisible = false;
          }
        });
      // location.reload();
      // this.isChange += 1;
    },

    //删除事件
    delEvent() {
      this.axios
        .delete("http://139.224.65.105:9090/api/event/" + this.form.id)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: response.data.message,
              type: "error",
            });
            this.dialogFormVisible = false;
          }
        });
      // location.reload();
      // this.isChange += 1;
      // this.$forceUpdate();
    },

    //拖动事件
    dropEvent(info) {
      this.form = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
      };
      this.updateEvent();
    },
  },

  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data() {
    return {
      typeRoute:"",
      Info:{},
      isChange: 0,
      id:"",
      userType:"",
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        locale: "zh-cn",
        firstDay: 1,
        weekNumberCalculation: "ISO",
        editable: true,
        droppable: true,
        displayEventEnd: true,
        eventTimeFormat: {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        },
        headerToolbar: {
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "prevYear,prev,next,nextYear today",
        },
        // events: (info) => {
        //   this.getEventsList(info);
        // },
        events: this.getEventsList,
        eventColor: "#378006", //事件背景颜色
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventDrop: (info) => {
          this.dropEvent(info);
        },
      },

      form: {
        title: null,
        start: null,
        end: null,
      },
      optTitle: "日历服务",
    };
  },
  mounted(){
    this.id=localStorage.getItem('id')
    this.userType=localStorage.getItem('type')
    if(localStorage.getItem('type')==="学生"){
      this.typeRoute="/stu"
    }
    else{
      this.typeRoute="/tea"
    }
    this.axios
      .get("http://139.224.65.105:9090/api/user",{
        params:{
          id:this.id,
          type:this.userType
        }
      })
      .then((response) => {
        this.Info = response.data.data;
      })
  }
});
</script>