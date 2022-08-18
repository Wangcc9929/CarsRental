import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import Register from "../views/Login/Register.vue";
import Forget from "../views/Login/Forget.vue"
import Index from '../views/layout/Index.vue'
import Role from '../views/admin/Role'
import User from '../views/admin/User'
import Home from '../views/Home/Index'
import Menu from '../views/Menu/Index'
import ParkingList from '../views/Parking/Index'
import AddParking from '../views/Parking/addParking'
import CarBrand from '../views/carBrand/Index'
import CarList from '../views/Car/Index'
import AddCar from '../views/Car/AddCar'
import CarsAttr from "../views/Car/CarsAttrList"
import Time from "../views/Time/Index"
import MemberList from "../views/Member/index"
import MemberDetailed from "../views/Member/detailed"
import MemberEdit from "../views/Member/editMember"
import Order from "../views/order/index"

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    //登录
    {
      path: "/",
      name: "Login",
      component: Login,
      hidden: true,
    },
    //注册
    {
      path: "/register",
      name: 'Register',
      component: Register,
      hidden: true,
    },
    //忘记密码
    {
      path: "/forget",
      name: 'Forget',
      component: Forget,
      hidden: true,
    },
    //后台框架
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: "首页",
        icon: "el-icon-s-home"
      },
      children: [
        {
          path: '/index/home',
          name: 'Home',
          component: Home,
          meta: {
            title: "首页"
          },
        },
      ]
    },
    //用户管理
    {
      path: '/memberindex',
      name: 'MemberIndex',
      component: Index,
      meta: {
        title: "用户管理",
        icon: "el-icon-user"
      },
      children: [
        {
          path: '/memberindex/list',
          name: 'MemberList',
          component: MemberList,
          meta: {
            title: "用户列表"
          },
        },
        {
          path: '/memberindex/detailed',
          name: 'MemberDetailed',
          component: MemberDetailed,
          hidden:true,
          meta: {
            title: "用户详情"
          },
        },
        {
          path: '/memberindex/edit',
          name: 'MemberEdit',
          component: MemberEdit,
          hidden:true,
          meta: {
            title: "编辑用户信息"
          },
        },
      ]
    },
    // {
    //   path: "/menuIndex",
    //   name: "MenuIndex",
    //   meta: {
    //     title: "菜单管理",
    //     icon: "el-icon-menu"
    //   },
    //   component: Index,
    //   children: [
    //     {
    //       path: '/menuIndex/menu',
    //       name: 'Menu',
    //       component: Menu,
    //       meta: {
    //         title: "菜单管理"
    //       },
    //     },
    //   ]
    // },

    //停车场管理
    {
      path: "/parkingIndex",
      name: "ParkingIndex",
      meta: {
        title: "停车场管理",
        icon: "el-icon-place"
      },
      component: Index,
      children: [
        {
          path: '/parkingIndex/list',
          name: 'ParkingList',
          component: ParkingList,
          meta: {
            title: "停车场列表",
          }
        },
        {
          path: '/parkingIndex/add',
          name: 'AddParking',
          component: AddParking,
          meta: {
            title: "新增停车场",
          }
        },
      ]
    },
    //车辆品牌管理
    {
      path: "/carBrandIndex",
      name: "CarBrandIndex",
      meta: {
        title: "车辆品牌管理",
        icon:"el-icon-odometer"
      },
      component: Index,
      children: [
        {
          path: '/carBrandIndex/list',
          name: 'CarBrandList',
          component: CarBrand,
          meta: {
            title: "车辆品牌管理",
          }
        },
      ]
    },
    //车辆管理
    {
      path:'/carIndex',
      name:'CarIndex',
      meta:{
        title:'车辆管理',
        icon: "el-icon-truck"
      },
      component:Index,
      children:[
        {
          path:'/carIndex/list',
          name:'CarList',
          meta: {
            title: "车辆列表",
          },
          component:CarList
        },
        {
          path:'/carIndex/add',
          name:'AddCar',
          meta: {
            title: "新增车辆",
          },
          component:AddCar,
        },
        {
          path:'/carIndex/attr',
          name:'CarsAttr',
          meta: {
            title: "车辆属性",
          },
          component:CarsAttr,
        },
      ]
    },
    //租赁时长管理
    {
      path: '/timeindex',
      name: 'TimeIndex',
      component: Index,
      meta: {
        title: "租赁时长",
        icon: "el-icon-timer"
      },
      children: [
        {
          path: '/timeindex/leaseList',
          name: 'LeaseList',
          component: Time,
          meta: {
            title: "租车类型"
          },
        },
      ]
    },
    {
      path: '/orderindex',
      name: 'OrderIndex',
      component: Index,
      meta: {
        title: "订单管理",
        icon: "el-icon-wallet"
      },
      children: [
        {
          path: '/orderindex/list',
          name: 'OrderList',
          component: Order,
          meta: {
            title: "订单列表"
          },
        },
      ]
    }
  ]
});
