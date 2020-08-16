import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


type state = Store['state']


type VoidMutation<T> = (state: state, val: T) => void

interface Store {
  state: {
    IS_CONNECTED: Boolean,
    ONLINE_INSTANCE: OnlineInstance,
    PLAYER_DATA: PlayerData
  },
  mutations: {
    CONNECTION_CHANGE: VoidMutation<boolean>,
    SET_ONLINE_INSTANCE: VoidMutation<state['ONLINE_INSTANCE']>,
    SET_PLAYER_DATA: VoidMutation<state['PLAYER_DATA']>
  }
}

const state: Store = {
  state: {
    IS_CONNECTED: false,
    ONLINE_INSTANCE: {
      id: null,
      flags: {
        started: false,
        ended: false,
      },
      fruit: null,
      gridSize: null,
      players: []
    },
    PLAYER_DATA: {
      id: null,
      name: null,
      game_id: null,
      flags: {
        connected: false,
        prepared: false
      },
      snake: null,
      secret: null
    }
  },
  mutations: {
    CONNECTION_CHANGE (state, val) {
      state.IS_CONNECTED = val
    },
    SET_ONLINE_INSTANCE (state, val) {
      state.ONLINE_INSTANCE = val
    },
    SET_PLAYER_DATA (state, val) {
      state.PLAYER_DATA = val
    }
  }
}

const store = new Vuex.Store(state)

export default store