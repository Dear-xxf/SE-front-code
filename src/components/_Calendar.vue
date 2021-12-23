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
          <FullCalendar
            defaultView="dayGridMonth"
            locale="zh-cn"
            firstDay="1"
            weekNumberCalculation="ISO"
            :eventTimeFormat="evnetTime"
            :header="header"
            @dateClick="handleDateClick"
            :plugins="calendarPlugins"
            :events="calendarEvents"
            @eventClick="handleEventClick"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
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
// import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import "@fullcalendar/core/main.css";
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
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },
    handleDateClick(arg) {
      if (confirm("您是否要在" + arg.dateStr + "添加一个新的事件?")) {
        this.calendarEvents.push({
          // add new event data
          title: "新的事件",
          start: arg.date,
          allDay: arg.allDay,
        });
      }
    },
    handleEventClick(info) {
      alert("Event: " + info.event.title);
      info.el.style.borderColor = "red";
    },

    addEvent(info) {
      console.log(info)
    },
    editEvent(info) {
      console.log(info)
    },
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        initialDate: new Date(), //控制指定显示日期
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        locale: "zh", //中文
        slotMinTime: "09:00", //展示时间
        slotMaxTime: "18:00", //展示时间
        dateClick: this.addEvent, //点击日历个空白触发事件
        eventClick: this.editEvent, //点击event触发事件
        events: [
          {
            title: "",
            start: "",
            end: "",
            id: "",
          },
        ], //日程
      },
    };
  },
};
</script>
