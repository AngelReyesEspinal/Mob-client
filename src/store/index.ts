import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    reload: false,
    loading: false,
  },
  mutations: {
    setLoading (state, newValue) {
      state.loading = newValue
    },
    setReload (state, newValue) {
      state.reload = newValue
    }
  },
  actions: {
  },
  modules: {
  }
})
