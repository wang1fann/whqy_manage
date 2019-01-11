import Vue from 'vue';
import Vuex from 'vuex';
// import API from '@/api/api_site'; //API.findMenuList

Vue.use(Vuex);
// export default new Vuex.Store({
//     state: {
//         LOADING: false,
//     },
//     mutations: {
//         showLoading(state) {
//             state.LOADING = true
//         },
//         hideLoading(state) {
//             state.LOADING = false
//         }
//     },
//     modules: {}
// })
// modules import
// import cases from './modules/case'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        LOADING: false,
    },
    mutations: {
        showLoading(state) {
            state.LOADING = true
        },
        hideLoading(state) {
            state.LOADING = false
        }
    },
    modules: {
        // cases
    },
    strict: debug
})