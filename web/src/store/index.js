import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import location from "./modules/location";
import app from "./modules/app"
import config from "./modules/config";
export default new Vuex.Store({
  modules: {location,app,config},
});
