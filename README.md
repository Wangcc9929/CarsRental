# 汽车租赁平台

汽车租赁平台是基于Vue实现的简易的汽车租借的前台和后台的项目

## 前台-web

基于vue框架，利用axios收发数据，地图信息基于高德开发的Amap实现
主要实现功能：

- 用户登录、注册、忘记密码等操作
- 对用户位置进行定位
- 显示附近停车场，在用户点击该停车场后，显示用户当前位置到该停车场的导航，并显示停车场内可用车辆
- 点击车辆详细信息并选择租赁类型后进行预约，若用户未登录会先跳转到登录界面，若押金余额不足互译跳转到支付页面。
- 在预约车辆后，用户可自行确定取车或取消预约，在完成订单前需将车辆就近停入停车场并确认还车

运行方式：

```
npm install
npm run serve
```



## 后台-admin

基于Vue框架，利用axios收发数据，对租车平台进行管理

主要实现以下信息：

- 停车场信息管理，包括停车场定位、停车场类型、是否启用、可停放车辆数、添加停车场等
- 车辆信息管理，包含车辆车牌号、品牌、租赁价格、停放停车场、当前状态、添加车辆等
- 用户管理，包含用户基本信息、用户余额等
- 订单管理，包含订单号、订单状态、订单金额、订单用户、订单车辆等

运行方式：

```
npm install
npm run serve
```

