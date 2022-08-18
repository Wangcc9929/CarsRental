const state = {
    isClickCarsList:true,
}
const mutations = {
    SELF_CARS_LIST_STATUS(state,value){
        state.isClickCarsList=value;  // true 与 false 之间的切换
    },
    
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
