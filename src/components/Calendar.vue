<template>
  <div>
    <el-container>
      <el-header>
        <a href="https://www.tongji.edu.cn/">
          <img src="../assets/tjlogo.png" />
        </a>

        <span class="title">同济大学实验课程管理</span>

        <div class="profile">
          <el-avatar
            :size="size"
            :fit="fit"
            :src="circleUrl"
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
                <el-icon><location /></el-icon>
                <span>个人信息</span>
              </template>
              <el-menu-item index="1-1">个人主页</el-menu-item>
              <el-menu-item index="1-2">修改信息</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><collection /></el-icon>
                <span>我的课程</span>
              </template>
              <el-menu-item index="2-1">课程列表</el-menu-item>
              <el-menu-item index="2-2">我的课表</el-menu-item>
              <el-menu-item index="2-3">课程成绩</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon><bell-filled /></el-icon>
                <span>通知中心</span>
              </template>
              <el-menu-item index="3-1">系统公告</el-menu-item>
              <el-menu-item index="3-2">课程通知</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="4">
              <el-icon><clock /></el-icon>
              <template #title>日历</template>
            </el-menu-item>
            <br /><br /><br />
            <el-menu-item index="5" @click="changeIsCollapse()">
              <el-icon><setting /></el-icon>
              <template #title>展开/收缩</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <!-- <div id="calendar" /> -->

          <!-- <button @click="toggleWeekends">toggle weekends</button> -->
          <FullCalendar :options="calendarOptions" />
          <!-- <el-dialog :title="optTitle" :visible.sync="dialogFormVisible"> -->
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
                <el-button type="primary" @click="saveEvent">确 定</el-button>
              </div>
            </template>
          </el-dialog>

          <!-- <el-calendar v-model="value" />

          <el-calendar>
            <template #dateCell="{ data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split("-").slice(1).join("-") }}
                {{ data.isSelected ? "✔️" : "" }}
              </p>
            </template>
          </el-calendar> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style lang="scss" scoped>
.is-selected {
  color: #1989fa;
}

.el-header {
  background-color: #427fc5;
  height: 86px !important;
  position: relative;
}
.el-aside {
  background-color: rgb(250, 250, 250);
  color: var(--el-text-color-primary);
  text-align: center;
  height: 700px;
  margin: 0;
  padding: 0;
  display: block;
  width: auto !important;
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
import { ElMessageBox } from "element-plus";
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
    // const handleClose = (key, keyPath) => {
    //   console.log(key, keyPath);
    // };
    //表单弹出后，点击表单以外的范围可触发 handleClose
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

    //获取事件列表
    getEventsList(info) {
      this.axios
      // .get("http://139.224.65.105:9090/api/event?beginDate=Mon%20Nov%2029%202021%2000:00:00%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&endDate=Mon%20Nov%2029%202021%2000:00:00%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4")
      // .get("http://139.224.65.105:9090/api/event?beginDate=" + info.start + "&endDate=" + info.end)
      .get("http://139.224.65.105:9090/api/event", {
        params: {
          beginDate: info.start,
          endDate: info.end
        }
      })
      .then(() => {
        console.log("success!");
      })
      .catch(function() {
        console.log(info);
        console.log(info.start);
        console.log(info.startStr);
      })

      // let params = {
      //   start: info.start.valueOf(),
      //   end: info.end.valueOf(),
      // };
      // console.log(params);
      // this.$get("events.php", params).then((res) => {
      //   this.events = res;
      // });
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
      this.$post("events.php?action=save", this.form).then((res) => {
        if (res.code === 0) {
          if (this.form.id === undefined || this.form.id == "") {
            //新增
            this.form.id = res.id;
            this.calendarEvents.push(this.form);
            this.$message({
              message: "新增成功！",
              type: "success",
            });
          } else {
            //修改
            this.calendarEvents.forEach((item, index, arr) => {
              if (item.id == this.form.id) {
                arr[index].title = this.form.title;
                arr[index].start = this.form.start;
                arr[index].end = this.form.end;
              }
            });
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          }

          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
        }
      });
    },

    //删除事件
    delEvent() {
      
      this.$post("events.php?action=del", { id: this.form.id }).then((res) => {
        if (res.code === 0) {
          this.calendarEvents.forEach((item, index, arr) => {
            if (item.id == this.form.id) {
              arr.splice(index, 1);
            }
          });
          this.dialogFormVisible = false;
          this.$message({
            message: "删除成功！",
            type: "success",
          });
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
        }
      });
    },

    //拖动事件
    dropEvent(info) {
      this.form = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
      };
      this.saveEvent();
    },
  },

  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
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
        // customButtons: {
        //   myCustomButton: {
        //     text: "custom",
        //     click: function () {
        //       alert("clicked the custom button!");
        //     },
        //   },
        // },
        headerToolbar: {
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "prevYear,prev,next,nextYear today",
        },
        // events: [
        //   {
        //     id: 1,
        //     title: "nihao",
        //     start: "2021-12-24",
        //     end: "2021-12-26",
        //   }
        // ],
        // events: 'http://139.224.65.105:9090/api/event',
        events: (info) => {
          this.getEventsList(info);
        },
        eventColor: "#378006", //事件背景颜色
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventDrop: (info) => {
          this.dropEvent(info);
        },
        // datesRender: (arg) => {
        //   this.getEventsList(arg.view);
        // },
        // dayMaxEventRows: 2,
      },

      form: {
        title: null,
        start: null,
        end: null,
      },
      optTitle: "日历服务",
    };
  },
});
</script>
