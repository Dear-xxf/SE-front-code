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
          <el-row
            v-for="item in this.tableData"
            :key="item"
            :gutter="10"
            justify="center"
          >
            <el-col :span="20">
              <div class="grid-content bg-purple-dark">
                <el-link
                  ><b class="labName">{{ item.name }}</b></el-link
                >
              </div>
            </el-col>
            <el-col :span="20">
              <el-descriptions title="" :column="4" border>
                <el-descriptions-item
                  label="项目ID"
                  label-align="center"
                  align="center"
                  label-class-name="my-label"
                  class-name="my-content"
                  >{{ item.id }}</el-descriptions-item
                >
                <el-descriptions-item
                  label="创建人"
                  label-align="center"
                  align="center"
                  >{{ item.teacherId }}</el-descriptions-item
                >
                <el-descriptions-item
                  label="实验分值"
                  label-align="center"
                  align="center"
                >
                  <el-tag size="small">{{ item.experimentScore }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                  label="截止时间"
                  label-align="center"
                  align="center"
                  ><el-icon><clock /></el-icon
                  >{{ item.experimentDeadline }}</el-descriptions-item
                >
              </el-descriptions>
            </el-col>
          </el-row>

        </el-main>
      </el-container>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>



<style lang="scss" scoped>
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
      courseId: 60020,
      tableData: [{}],
    };
  },

  mounted: function () {
    this.axios
      .get(
        "http://139.224.65.105:9090/api/experiment/courseId/" + this.courseId
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          this.tableData = response.data.data;
          console.log(this.tableData);
          return true;
        } else {
          return false;
        }
      });
  },
};
</script>
