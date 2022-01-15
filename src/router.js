import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "./components/login"
import unloginedHome from "./components/unloginedHome"
import Home from "./components/Home"
import stuPersonalInfo from "./components/student/Info/personalInfo"
import changeStudentInfo from "./components/student/Info/changeStudentInfo"
import messageCenter from "./components/messageCenter"
import Calendar from "./components/Calendar"
import CourseCenter from "./components/student/class/CourseCenter"
import stuclassInfo from "./components/student/class/classInfo"
import teaclassInfo from "./components/teacher/class/classInfo"
import LabCenter from "./components/student/class/LabCenter"
import practice from "./components/practice"
import teaCreateLab from "./components/teacher/class/createLab"
import teaPersonalInfo from "./components/teacher/Info/personalInfo"
import teaCourseCenter from "./components/teacher/class/CourseCenter"
import teaLabCenter from "./components/teacher/class/LabCenter"
import admCourseCenter from "./components/administrator/CourseCenter"

const routes = [
    {
        path: "/",
        redirect: "/unloginedHome"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/unloginedHome",
        component: unloginedHome
    },
    {
        path: "/Home",
        component: Home
    },
    {
        path: "/stu/personalInfo",
        component: stuPersonalInfo
    },
    {
        path: "/messageCenter",
        component: messageCenter
    },
    {
        path: "/stu/changeStudentInfo",
        component: changeStudentInfo
    },
    {
        path: "/Calendar",
        component: Calendar
    },
    {
        path: "/stu/classInfo",
        component: stuclassInfo
    },
    {
        path: "/stu/CourseCenter",
        component: CourseCenter
    },
    {
        path: "/tea/classInfo",
        component: teaclassInfo
    },
    {
        path: "/stu/LabCenter",
        component: LabCenter
    },
    {
        path: "/practice",
        component: practice
    },
    {
        path: "/tea/createLab",
        component: teaCreateLab
    },
    {
        path: "/tea/CourseCenter",
        component: teaCourseCenter
    },
    {
        path: "/tea/personalInfo",
        component: teaPersonalInfo
    },
    {
        path: "/tea/LabCenter",
        component: teaLabCenter
    },
    {
        path: "/adm/CourseCenter",
        component: admCourseCenter
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router