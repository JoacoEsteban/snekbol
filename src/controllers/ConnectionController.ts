import config from '../config/core.config'
import store from '../vue/store'
import axios, { AxiosInstance } from 'axios'
import { AllowedDirections } from '@/typings'

class ConnectionController {
  BASE_URL: string
  WS: WebSocket | null
  IS_CONNECTED: boolean
  HTTP_URL: string
  WS_URL: string
  API: AxiosInstance

  constructor (BASE_URL = config.BASE_URL) {
    this.BASE_URL = BASE_URL
    this.WS = null
    this.IS_CONNECTED = false
    this.HTTP_URL =`${config.USE_SSL ? 'https' : 'http'}://${this.BASE_URL}`
    this.WS_URL =`${config.USE_SSL ? 'wss' : 'ws'}://${this.BASE_URL}`

    this.API = axios.create({
      baseURL: this.HTTP_URL,
      timeout: 20000,
    })

    this.ping()
  }
  async login(name: string) {
    try {
      const res = await this.API.post('/login', { name })
      console.log('login success', res.data)
      store.commit('SET_PLAYER_DATA', res.data.player)

      this.initializeWebSocket()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async ping () {
    await this.API.get('/ping')
  }
  initializeWebSocket() {
    const ws = this.WS = new WebSocket(this.WS_URL, 'protocolOne')

    ws.onopen = () => {
      console.log('connected to ws')
      this.IS_CONNECTED = true
      ws.send(JSON.stringify({
        directive: 'connect',
        player_id: store.state.PLAYER_DATA.id,
        player_secret: store.state.PLAYER_DATA.secret,
      }))
    }

    ws.onmessage = ({data}) => {
      store.commit('SET_ONLINE_INSTANCE', JSON.parse(data))
      store.state.PLAYER_DATA.id
    }

    ws.onclose = () => {
      console.log('F')
    }
  }

  sendDirection(direction: AllowedDirections) {
    if (!this.IS_CONNECTED || !this.WS) return
    this.WS.send(JSON.stringify({
      directive: 'direction',
      player_id: store.state.PLAYER_DATA.id,
      player_secret: store.state.PLAYER_DATA.secret,
      direction
    }))
  }
  async imready() {
    if (!store.state.PLAYER_DATA || !this.WS) return false
    this.WS.send(JSON.stringify({
      directive: 'im-ready',
      game_id: store.state.PLAYER_DATA.game_id,
      player_id: store.state.PLAYER_DATA.id,
      player_secret: store.state.PLAYER_DATA.secret
    }))
    return true
  }
}

export default ConnectionController