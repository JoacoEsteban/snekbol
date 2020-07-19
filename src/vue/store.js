import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    IS_CONNECTED: false,
  },
  mutations: {
    CONNECTION_CHANGE (state, val) {
      state.IS_CONNECTED = val
    }
  }
})

export default store