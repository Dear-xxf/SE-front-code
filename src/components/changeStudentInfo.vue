<template>
    <div>
        <el-container >
        <el-header>
            <a href="https://www.tongji.edu.cn/">
            <img src="../assets/tjlogo.png" style="margin:7px auto;">
            </a>
        
            <span class="title">同济大学实验课程管理</span>

            <div class="profile">
                <el-avatar :size="size" :fit="fit" :src="circleUrl" @error="errorHandler">
                <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
                </el-avatar>
            </div>

        </el-header>


        <el-container>


            <el-aside>
                <br/><br/>
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location style="width: 1.3em; height: 1.3em;" /></el-icon>
                        <span>个人信息</span>
                    </template>
                        <el-menu-item index="1-1" @click='this.$router.push("/personalInfo")'>个人主页</el-menu-item>
                        <el-menu-item index="1-2" @click='this.$router.push("/changeStudentInfo")'>修改信息</el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="2">
                    <template #title>
                        <el-icon><collection style="width: 1.3em; height: 1.3em;" /></el-icon>
                        <span>我的课程</span>
                    </template>
                        <el-menu-item index="2-1" @click='this.$router.push("/myClass")'>课程列表</el-menu-item>
                        <el-menu-item index="2-2" @click='this.$router.push("/myClassTable")'>我的课表</el-menu-item>
                        <el-menu-item index="2-3" @click='this.$router.push("/myGrade")'>课程成绩</el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                    <template #title>
                        <el-icon><bell-filled style="width: 1.3em; height: 1.3em;" /></el-icon>
                        <span>通知中心</span>
                    </template>
                        <el-menu-item index="3-1" @click='this.$router.push("/messageCenter")'>系统公告</el-menu-item>
                        <el-menu-item index="3-2" @click='this.$router.push("/classNotice")'>课程通知</el-menu-item>
                    </el-sub-menu>

                    <el-menu-item index="4" @click='this.$router.push("/calendar")'>
                    <el-icon><clock style="width: 1.3em; height: 1.3em;" /></el-icon>
                    <template #title>日历</template>
                    </el-menu-item>
                    <br/><br/><br/>
                    <el-menu-item index="5" @click="changeIsCollapse()">
                    <el-icon><setting style="width: 1.3em; height: 1.3em;" /></el-icon>
                    <template #title>展开/收缩</template>
                    </el-menu-item>
                </el-menu>


            </el-aside>

            <el-main :style="{left:200-isCollapse*144+'px'}">
                <el-upload
                    class="avatar-uploader"
                    list-type="picture-card"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <el-avatar v-if="avatarUrl" shape="square" :fit='fill' :src="avatarUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
                </el-upload><br/><br/>
                <span>姓名&nbsp;&nbsp;</span>
                <el-input v-model="input" disabled :placeholder='Info.name'/>
                <span>&nbsp;&nbsp;性别&nbsp;&nbsp;</span>
                <el-input v-model="input" disabled :placeholder='Info.gender'/><br/><br/>
                <span>电话号码&nbsp;&nbsp;</span>
                <el-input v-model="input" :placeholder='Info.telephone'/><br/><br/>
                <el-select v-model="value" placeholder="Select">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>

            </el-main>


        </el-container>


        </el-container>
    </div>    
</template>



<style scoped>
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
  position: absolute;
  top: 110px;
  right:0px;
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
.title{
  color:white;
  font-size: 25px;
  font-family: "Microsoft YaHei";
  position:absolute;
  top:35%;
  left:20%
}
.profile{
  position:absolute;
  top:35%;
  right: 30px;
}
.el-radio-group{
    position:absolute;
    bottom: 10%;
    margin: 0 auto;
    padding:1rem;
}
.el-menu{
    width:55px;
    background:rgb(250, 250, 250)
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 0px;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
.el-input{
    width:200px;
}
</style>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Plus,
} from '@element-plus/icons'
import { 
        ref,
    } from 'vue'
export default{
    Location,
    Document,
    IconMenu,
    Setting,
    components: {
        Plus,
    },
    setup() {
        const isCollapse = ref(true)
        const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
        }
        
        return {
        isCollapse,
        handleOpen,
        handleClose,
        input: ref(''),
        options: ref([
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
        ]),
        value: ref(''),
        }   
    },
    mounted(){
        
    },
    methods: {
        changeIsCollapse(){
            if(this.isCollapse == 0){ 
                this.isCollapse= 1
            }
            else{
                this.isCollapse = 0
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format!')
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!')
            }
            return isJPG && isLt2M
            }
        },
        data(){
            return {
                url: "http://139.224.65.105:9090/api",
                avatarUrl: require("../assets/unlogined.jpg"),
                Info: {
                    name:"宁之恒",
                    gender:"男",
                }
            }
        }
    }
</script>
