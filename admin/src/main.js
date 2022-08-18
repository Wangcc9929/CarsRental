import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueAMap from 'vue-amap'
//配置axios
// import axios from 'axios'
// import VueAxios from 'vue-axios'

//加密md5
import md5 from 'js-md5';

// Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
//初始化高德地图
window._AMapSecurityConfig = {
  securityJsCode:'0418bc1f83274ff0e731644748b165ab',
},
VueAMap.initAMapApiLoader({
  key: "0c26293846b2f9462fc7c916420b7aa5",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
 });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
