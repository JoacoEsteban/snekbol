import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    IS_CONNECTED: false,
    ONLINE_INSTANCE: null,
    PLAYER_DATA: null,
  },
  mutations: {
    CONNECTION_CHANGE (state, val) {
      state.IS_CONNECTED = val
    },
    SET_PLAYER_DATA (state, val) {
      state.PLAYER_DATA = val
    },
    SET_ONLINE_INSTANCE (state, val) {
      state.ONLINE_INSTANCE = val
    }
  }
})

export default store