import config from '../config/core.config'
import store from '../vue/store'
import axios from 'axios'

class ConnectionController {
  constructor (BASE_URL = config.BASE_URL) {
    this.BASE_URL = BASE_URL
    // ---
    this.WS = null
    this.IS_CONNECTED = false
    
    this.HTTP_URL =`${config.USE_SSL ? 'https' : 'http'}://${this.BASE_URL}`
    this.WS_URL =`${config.USE_SSL ? 'wss' : 'ws'}://${this.BASE_URL}`

    this.API = axios.create({
      baseURL: this.HTTP_URL,
      timeout: 20000,
      // headers: {
      // },
      // validateStatus: st => (st >= 200 && st < 300) || st === 304
    })
    this.ping()
  }
  async login(name) {
    try {
      const res = await this.API.post('/login', {
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
  async ping () {
    try {
      await this.API.get('/ping')
    } catch (error) {
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