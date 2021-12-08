import { createRouter, createWebHistory } from 'vue-router'
import Login from "./components/login"
import Home from "./components/Home"
// import personalInfo from "./components/personalInfo"
// import myClass from "./components/myClass"
import messageCenter from "./components/messageCenter"
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
        //主页
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
    // {
    //     path:"/personalInfo",
    //     component: personalInfo
    // },
    // {
    //     path:"/myClass",
    //     component: myClass
    // },
    // {
    //     path:"/messageCenter",
    //     component: messageCenter
    // },

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