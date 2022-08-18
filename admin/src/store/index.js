import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import config from './modules/config'
import watcher from "./modules/watcher"
export default new Vuex.Store({
  state:{
    isCollapse: false,
  },
  getters: {},
  mutations: {
    CHANGECOLL(state){
      state.isCollapse=!state.isCollapse;
    }
  },
  actions: {},
  modules: {
    config,
    watcher,
  },
});
