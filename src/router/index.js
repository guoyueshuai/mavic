import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/pages/login'  //登录
import Home from '@/components/common/home'       //登陆后总页面
import Index from '@/components/pages/index'    //首页
import RI_abnormal from '@/components/pages/RI_abnormal'  //Rothman Index异常
import Abnormal_physiological_parameters from '@/components/pages/Abnormal_physiological_parameters'  //生理参数异常
import user_list from '@/components/pages/user_list'    //用户列表
import RI_Overview from '@/components/pages/RI_Overview'    //Rothman Index总览
import user_details from '@/components/pages/user_details'  //Rothman Index详情
import user_information from '@/components/pages/user_information'  //健康信息
import User_information_statistics from '@/components/pages/User_information_statistics'  //用户信息统计
import set_up from '@/components/pages/Set_up'    //设置与反馈


Vue.use(Router)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  
  { path:'/home',
    component:Home,
    children:[
      {path:'/',redirect:'/home/index'},
      //首页
      {path:'/home/index',component:Index},
      {path:'/home/index/user_information',component:user_information},
      {path:'/home/index/user_details',component:user_details},
      //RI_异常
      {path:'/home/RI_abnormal',component:RI_abnormal},
      {path:'/home/RI_abnormal/user_information',component:user_information},
      {path:'/home/RI_abnormal/user_details',component:user_details},
      //生理参数异常
      {path:'/home/Abnormal_physiological_parameters',component:Abnormal_physiological_parameters},
      //用户列表
      {path:'/home/user_list',component:user_list},
      {path:'/home/user_list/user_details',component:user_details},
      {path:'/home/user_list/user_information',component:user_information},
      //RI总览
      {path:'/home/RI_Overview',component:RI_Overview},
      {path:'/home/RI_Overview/user_details',component:user_details},
      {path:'/home/RI_Overview/user_information',component:user_information},
      //用户信息统计
      {path:'/home/User_information_statistics',component:User_information_statistics},
      //设置与反馈
      {path:'/home/Set_up',component:set_up}
    ]}
]
export default new Router({
  routes,
  linkActiveClass:"router_show"
})
