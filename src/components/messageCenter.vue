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
          <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="User Info" name="1">
                <div>
                  <el-descriptions title="">
                    <el-descriptions-item label="Username"
                      >kooriookami</el-descriptions-item
                    >
                    <el-descriptions-item label="Telephone"
                      >18100000000</el-descriptions-item
                    >
                    <el-descriptions-item label="Place"
                      >Suzhou</el-descriptions-item
                    >
                    <el-descriptions-item label="Remarks">
                      <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="Address"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou,
                      Jiangsu Province</el-descriptions-item
                    >
                  </el-descriptions>
                </div>
              </el-collapse-item>
              <el-collapse-item title="Feedback" name="2">
                <div>1</div>
                <div>2</div>
              </el-collapse-item>
            </el-collapse>
          </div>

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
            height="250"
            style="width: 100%"
          >noticeTitle
            <el-table-column prop="noticeTitle" label="公告标题" />
            <el-table-column prop="createTime" sortable label="发布时间" />
            <el-table-column prop="administratorId" label="发布管理员代号" />
            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="Type to search"
                />
              </template>
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <el-footer>Footer</el-footer>
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
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const activeNames = ref([""]);
    const handleChange = (val) => {
      console.log(val);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
      activeNames,
      handleChange,
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
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  data() {
    return {
      tableData: [
        {
          noticeTitle: "Tom",
          createTime: "2016-05-03",
          administratorId: 1,
        },
        {
          noticeTitle: "JiRi",
          createTime: "2016-05-02",
          administratorId: 2,
        },
      ],
      search: '',
    };
  },
});
</script>
