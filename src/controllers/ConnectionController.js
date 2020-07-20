import store from '../vue/store'
class ConnectionController {
  constructor (BASE_URL = 'localhost:5000') {
    this.BASE_URL = BASE_URL
    // ---
    this.WS = null
    this.IS_CONNECTED = false
  }
  get HTTP_URL () {
    return `http://${this.BASE_URL}`
  }
  get WS_URL () {
    return `ws://${this.BASE_URL}`
  }
  async login(name) {
    try {
      const res = await axios.post(this.HTTP_URL + '/login', {
        name: name
      })
      console.log('login success', res.data)
      store.commit('SET_PLAYER_DATA', res.data.player)
      // store.commit('SET_ONLINE_INSTANCE', res.data.game)
      this.initializeWebSocket()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  initializeWebSocket() {
    this.WS = new WebSocket(this.WS_URL, 'protocolOne')

    this.WS.onopen = (e) => {
      console.log('connected to ws')
      this.IS_CONNECTED = true
      this.WS.send(JSON.stringify({
        directive: 'connect',
        player_id: store.state.PLAYER_DATA.id,
        player_secret: store.state.PLAYER_DATA.secret,
      }))
    }

    this.WS.onmessage = ({data}) => {
      store.commit('SET_ONLINE_INSTANCE', JSON.parse(data))
    }

    this.WS.onclose = () => {
      console.log('F')
    }
  }

  sendDirection(direction) {
    if (!this.IS_CONNECTED) return
    this.WS.send(JSON.stringify({
      directive: 'direction',
      player_id: store.state.PLAYER_DATA.id,
      player_secret: store.state.PLAYER_DATA.secret,
      direction
    }))
  }
  async imready() {
    try {
      if (!store.state.PLAYER_DATA) return false
      await this.WS.send(JSON.stringify({
        directive: 'im-ready',
        game_id: store.state.PLAYER_DATA.game_id,
        player_id: store.state.PLAYER_DATA.id,
        player_secret: store.state.PLAYER_DATA.secret
      }))
      return true
    } catch (error) {
      throw error
    }
  }
}

export default ConnectionController