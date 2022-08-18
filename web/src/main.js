import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
// import '../src/styles/main.scss'
import 'swiper/css/swiper.css'
import AMapLoader from "@amap/amap-jsapi-loader";
import VueAMap from 'vue-amap'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引用全局组件
import Back from './components/back/index.vue'
import store from './store/index'
Vue.component('Back',Back);
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAMap)
Vue.use(VueAwesomeSwiper)

//初始化高德地图
window._AMapSecurityConfig = {
  securityJsCode:'0418bc1f83274ff0e731644748b165ab',
},
VueAMap.initAMapApiLoader({
  key: "0c26293846b2f9462fc7c916420b7aa5",
  plugin: [
    "AMap.Geolocation",
    "AMap.Walking",
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
  el:'#app',
  render: h => h(App),
  router:router,
  store
})