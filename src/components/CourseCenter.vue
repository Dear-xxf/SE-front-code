<template>
  <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
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
          <el-space wrap>
            <el-card
              v-for="item in this.tableData"
              :key="item"
              shadow="hover"
              :body-style="{ padding: '0px' }"
            >
              <template #header>
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div class="card-header" style="padding: 20px">
                  <span>{{ item.courseInfo.name }} {{ item.courseId }}</span>
                  <br />
                  <span>{{ item.courseInfo.college }}</span>
                </div>
                <el-link v-if="item.isActive!=0" :underline="false"><el-tag type="success" size="small">已激活，点击查看详情</el-tag></el-link>
                <el-link v-if="item.isActive==0" :underline="false"><el-tag type="danger" size="small">未激活，点击进行激活</el-tag></el-link>
              </template>
              <div class="bottom">
                <p>
                  <el-icon :size="15" style="margin-right: 10px"
                    ><message
                  /></el-icon>
                  <el-link type="primary" :disabled="item.isActive==0">公告</el-link>
                  <el-icon
                    :size="15"
                    style="margin-left: 20px; margin-right: 10px"
                    ><document /></el-icon
                  ><el-link type="success" :disabled="item.isActive==0">作业</el-link>
                </p>
                <p>
                  <el-icon :size="15" style="margin-right: 10px"
                    ><chat-line-round /></el-icon
                  ><el-link type="info" :disabled="item.isActive==0">讨论</el-link>
                  <el-icon
                    :size="15"
                    style="margin-left: 20px; margin-right: 10px"
                    ><folder /></el-icon
                  ><el-link type="warning" :disabled="item.isActive==0">文件</el-link>
                </p>
              </div>
            </el-card>
          </el-space>

          <!-- <el-space wrap>
            <el-card
              v-for="i in 3"
              :key="i"
              class="box-card"
              style="width: 250px"
            >
              <template #header>
                <div class="card-header">
                  <span>Card name</span>
                  <el-button class="button" type="text"
                    >Operation button</el-button
                  >
                </div>
              </template>
              <div v-for="o in 4" :key="o" class="text item">
                {{ "List item " + o }}
              </div>
            </el-card>
          </el-space> -->

          <!-- <el-row justify="space-around">
            <el-col :span="10"
              ><div class="grid-content bg-purple">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>Card name</span>
                      <el-button class="button" type="text"
                        >Operation button</el-button
                      >
                    </div>
                  </template>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "List item " + o }}
                  </div>
                </el-card>
              </div></el-col
            >
            <el-col :span="10"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
          </el-row>

          <el-row justify="space-around">
            <el-col
              v-for="(o, index) in 2"
              :key="o"
              :span="8"
              :offset="index > 0 ? 2 : 0"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Yummy hamburger</span>
                  <div class="bottom">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">Operating</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row> -->
        </el-main>
      </el-container>

      <el-footer>Footer</el-footer>
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
import { defineComponent, ref } from "vue";

export default defineComponent({
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
  },

  data() {
    return {
      studentId: 200000,
      tableData: [
        {
          courseId: 60002,
          courseInfo: {
            college: "软件学院",
            credit: 2,
            name: "计算机组成原理",
            open_period: "星期三10-11节 [1-17]",
            place: "济事楼419",
            teacherInfo: Array(0),
            length: 0,
          },
          isActive: 1,
        },
      ],
    };
  },

  mounted: function () {
    this.axios
      .get("http://139.224.65.105:9090/api/student/takes/" + this.studentId)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          this.tableData = response.data.data;
          return true;
        } else {
          return false;
        }
      });
  },
});
</script>
