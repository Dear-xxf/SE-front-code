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
          <div class="InfoProfile">
            <el-avatar
              :size="150"
              :fit="fit"
              :src="Info.url"
              @error="errorHandler"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
          <br /><br />

          <div style="width: 1000px; margin: 0 auto">
            <el-descriptions
              title="个人信息/教师"
              direction="vertical"
              :column="4"
              border
            >
              <el-descriptions-item label="Username">{{
                Info.name
              }}</el-descriptions-item>
              <el-descriptions-item label="Gender">{{
                Info.gender
              }}</el-descriptions-item>
              <el-descriptions-item label="Telephone">{{
                Info.phoneNum
              }}</el-descriptions-item>
              <el-descriptions-item label="Major">
                <el-tag size="small">{{ Info.major }}</el-tag>
                <span>&nbsp;</span>
                <el-tag size="small">{{ Info.year }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="Email" :span="2">{{
                Info.mailbox
              }}</el-descriptions-item>
              <el-descriptions-item label="Location">{{
                Info.address
              }}</el-descriptions-item>
            </el-descriptions>
            <br /><br />
            <router-link to="/stu/changeStudentInfo">
              <el-button type="primary">修改</el-button>
            </router-link>
          </div>

          <br /><br /><br /><br />

          <div style="width: 1000px; margin: 0 auto">
            <b style="float: left">所选课程</b>
            <br /><br />
            <el-table
              :data="classData"
              stripe
              style="width: 100%"
              :cellstyle="rowStyle"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column prop="name" label="Class" width="250" />
              <el-table-column prop="teacherName" label="Teacher" width="250" />
              <el-table-column prop="open_period" label="Time" />
              <el-table-column prop="place" label="Place" />
            </el-table>
            <br /><br />
            <router-link to="/stu/CourseCenter">
              <span>查看全部课程信息</span>
            </router-link>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
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
    // const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath)
    // }
    // const handleClose = (key, keyPath) => {
    // console.log(key, keyPath)
    // }
    return {
      isCollapse,
    };
  },
  mounted() {
    // let id = this.$route.query.id
    let id = localStorage.getItem("id");
    let userType = localStorage.getItem("type");
    console.log(id);
    const btn = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/user", {
          params: {
            id: id,
            type: userType,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.Info = response.data.data;
        });
    };
    const getClassInfo = () => {
      this.axios
        .get(this.url + "/student/takes/" + id)
        .then((response) => {
          console.log(response);
          for (let i = 0; i < Math.min(5, response.data.data.length); i++) {
            let item = response.data.data[i].courseInfo;
            this.classData.push(item);
          }
          console.log(this.classData);
        })
        .then(() => {
          for (let i = 0; i < this.classData.length; i++) {
            let teacherName = "";
            for (let j = 0; j < this.classData[i].teacherInfo.length; j++) {
              if (this.classData[i].teacherInfo[j].characterName == "教师") {
                teacherName =
                  teacherName +
                  " " +
                  this.classData[i].teacherInfo[j].teacherName;
              }
            }
            this.classData[i].teacherName = teacherName;
          }
        });
    };
    btn();
    getClassInfo();
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
      vartarUrl: require("../../../assets/unlogined.jpg"),
      Info: {},
      url: "http://139.224.65.105:9090/api",
      classData: [],
    };
  },
};
</script>
