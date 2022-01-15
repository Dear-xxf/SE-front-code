<template>
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

        <el-main>
          <el-drawer
            v-model="drawer"
            v-if="drawer == true"
            title="公告详情"
            direction="rtl"
            :before-close="handleClose"
          >
            <em style="float: left">{{ this.noticeText }}</em>
          </el-drawer>
          <el-table
            :data="
              tableData.filter(
                (data) =>
                  !search ||
                  data.noticeTitle.toLowerCase().includes(search.toLowerCase())
              )
            "
            :default-sort="{ prop: 'createTime', order: 'descending' }"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="noticeTitle" label="公告标题" />
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
                <el-button size="mini" @click="viewDetails(scope.row.noticeText)"
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <!-- <el-footer>Footer</el-footer> -->
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
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 480px;
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
import { defineComponent, ref } from "vue";
export default defineComponent({
  Location,
  Document,
  IconMenu,
  Setting,
  setup() {
    const noticeText = ref();
    const drawer = ref(false);
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (done) => {
      done();
    };
    const activeNames = ref([""]);
    const handleChange = (val) => {
      console.log(val);
    };
    return {
      isCollapse,
      handleOpen,
      drawer,
      noticeText,
      handleClose,
      activeNames,
      handleChange,
    };
  },
  methods: {
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    viewDetails(info) {
      this.noticeText = info;
      console.log("公告：" + this.noticeText);
      this.drawer = true;
    },
    changeIsCollapse() {
      if (this.isCollapse == 0) {
        this.isCollapse = 1;
      } else {
        this.isCollapse = 0;
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  data() {
    return {
      typeRoute:"",
      Info: {},
      tableData: [
        {
          administratorId: 1,
          createTime: "2016-05-03",
          id: 0,
          noticeText: "",
          noticeTitle: "Tom",
          updateTime: "2016-05-03",
        },
      ],
      search: "",
    };
  },
  mounted: function () {
    if(localStorage.getItem('type')==="学生"){
      this.typeRoute="/stu"
    }
    else{
      this.typeRoute="/tea"
    }
    this.axios
      .get("http://139.224.65.105:9090/api/notice/system", {})
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          this.tableData = response.data.data;
          return true;
        } else {
          return false;
        }
      });
    let id = localStorage.getItem("id");
    console.log(id);
    const btn = () => {
      this.axios
        .get("http://139.224.65.105:9090/api/student/studentId/" + id)
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