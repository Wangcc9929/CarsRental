import Vue from "vue";
import VueRouter from "vue-router";
import Index from '../views/index/index.vue'
Vue.use(VueRouter);



export default new VueRouter({
    routes: [
        {
            name: 'Index',
            path: '/',
            component: Index,
            children: [
                {
                    path: '/user',
                    name: "User",
                    component: () => import("../views/user")
                },
                /**
                * 帐户
                */
                // 登录
                {
                    path: "/login",
                    name: "Login",
                    meta: {
                        title: "登录"
                    },
                    component: () => import("../views/account/login")
                },
                // 注册
                {
                    path: "/register",
                    name: "Register",
                    meta: {
                        title: "注册"
                    },
                    component: () => import("../views/account/register")
                },
                // 忘记密码
                {
                    path: "/forget",
                    name: "Forget",
                    meta: {
                        title: "忘记密码"
                    },
                    component: () => import("../views/account/forget")
                },
                //安全设置  -首页
                {
                    path: '/safe',
                    name: "Safe",
                    component: () => import("../views/safe/index")
                },
                //安全设置  -修改密码
                {
                    path: '/password',
                    name: "Password",
                    component: () => import("../views/safe/password")
                },
                //安全设置  -修改支付密码
                {
                    path: '/paypass',
                    name: "PayPass",
                    component: () => import('../views/safe/paypass')
                },
                //安全设置  -手机号
                {
                    path: '/phone',
                    name: 'Phone',
                    component: () => import('../views/safe/phone')
                },
                //安全设置  -银行卡
                {
                    path: '/bank',
                    name: 'Bank',
                    component: () => import('../views/safe/bank')
                },
                //安全设置  -添加银行卡
                {
                    path: '/bankadd',
                    name: 'BankAdd',
                    component: () => import('../views/safe/bankAdd')
                },
                // 我的帐户
                {
                    path: "/my",
                    name: "My",
                    meta: {
                        title: "我的帐户"
                    },
                    component: () => import("../views/my/index")
                },
                // 实名认证
                {
                    path: "/authentication",
                    name: "Authentication",
                    meta: {
                        title: "实名认证"
                    },
                    component: () => import("../views/authentication/index")
                },
                // 充值
                {
                    path: "/recharge",
                    name: "Recharge",
                    meta: {
                        title: "充值"
                    },
                    component: () => import("../views/recharge/index")
                },
                // 订单
                {
                    path: "/order",
                    name: "Order",
                    meta: {
                        title: "租车订单"
                    },
                    component: () => import("../views/order/index")
                },
                {
                    path: "/orderDetailed",
                    name: "OrderDetailed",
                    meta: {
                        title: "订单详情"
                    },
                    component: () => import("../views/order/detailed")
                },
                {
                    path: "/payStatus",
                    name: "PayStatus",
                    meta: {
                        title: "支付状态"
                    },
                    component: () => import("../views/pay/status")
                },
                {
                    path: "/payResult",
                    name: "PayResult",
                    meta: {
                        title: "支付结果"
                    },
                    component: () => import("../views/pay/result")
                },
            ]
        }
    ]
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}