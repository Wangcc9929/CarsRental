const state = {
    table_loadData_flag:true,
}
const mutations = {
    SET_TABLE_DATA_FLAG(state){
        state.table_loadData_flag=!state.table_loadData_flag;  // true 与 false 之间的切换
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
