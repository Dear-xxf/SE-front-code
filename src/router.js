import { createRouter, createWebHistory } from 'vue-router'
import Login from "./components/login"
import Home from "./components/Home"
import personalInfo from "./components/personalInfo"
import changeStudentInfo from "./components/changeStudentInfo"
// import myClass from "./components/myClass"
import messageCenter from "./components/messageCenter"
import LabCenter from "./components/LabCenter"
import CourseCenter from "./components/CourseCenter"
import Calendar from "./components/Calendar"
import _Calendar from "./components/_Calendar"

import Temp from "./components/Temp"
import test from "./components/test"
import test1 from "./components/test1"
import dq from "./components/dq_test"

const routes = [
    {
        path:"/",
        redirect:"/Home"
    },
    {
        //登录页
        path:"/login",
        name:'Login',
        component: Login
    },
    {
        path:"/Home",
        component: Home
    },
    {
        //模板
        path:"/Temp",
        component: Temp
    },
    {
        //系统公告
        path:"/messageCenter",
        component: messageCenter
    },
    {
        path:"/personalInfo",
        component: personalInfo
    },
    {
        //课程列表
        path:"/CourseCenter",
        component: CourseCenter
    },
    {
        //某门课程下的实验列表
        path:"/LabCenter",
        component: LabCenter
    },
    {
        //日历服务
        path:"/Calendar",
        component: Calendar
    },
    {
        //日历服务
        path:"/_Calendar",
        component: _Calendar
    },
    {
        path:"/changeStudentInfo",
        component: changeStudentInfo
    },
    {
        path:"/test",
        component: test
    },
    {
        path:"/test1",
        component: test1
    },
    {
        path:"/dq",
        component: dq
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router