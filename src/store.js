import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    polls: [],
    searchParam: '',

  },
  mutations: {
    'SET_POLLS'(state, polls) {
      state.polls = polls;
    },
    'SET_SEARCH'(state, param) {
      state.searchParam = param;
    },
  },
  actions: {
    setPolls({commit}, polls) {
      commit('SET_POLLS', polls);
    },
    setSearch({commit}, param) {
      commit('SET_SEARCH', param);
    }
  },
  getters: {
    polls(state) {
      return state.polls;
    },
    searchParam(state) {
      return state.searchParam;
    },
   }
})
