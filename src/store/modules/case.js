import API from "@/api/api_dangxingjiaoyu.js";

// initial state
const state = {
    caseList: [],
    caseTotal: 0
}

// getters
const getters = {}

// actions
const actions = {
        getCaseList({
            state,
            commit
        }, params) {
            var list = [];
            window.sessionStorage.responseType = 'json';
            let that = this;
            API.findList(params).then(function(result) {
                that.$message.error({
                    showClose: true,
                    message: result.message,
                    type: res.code === 20000 ? "success" : "error",
                    duration: 2000
                });
                if (!!result) {
                    commit('setList', result.data.rows)
                    commit('setTotal', result.data.total);
                } else {
                    commit('setList', list);
                }
            }).catch(function(error) {
                that.$message.error({
                    showClose: true,
                    message: error,
                    duration: 2000
                });
            });
        }
    }
    // mutations
const mutations = {
    setList(state, list) {
        state.caseList = list
    },
    setTotal(state, info) {
        state.caseTotal = info
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}