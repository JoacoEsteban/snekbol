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
      let resp = await axios.post(this.HTTP_URL + '/login', {
        name: name
      })
      console.log('login success', resp.data)
      SnakeApp.playerData = resp.data
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
    }

    this.WS.onmessage = ({
      data
    }) => {
      console.log('data', data)
      SnakeApp.onlineInstance = JSON.parse(data)
      paintSnakes()
    }

  }

  sendDirection() {
    if (!this.IS_CONNECTED) return
    this.WS.send(JSON.stringify({
      directive: 'direction',
      player_id: SnakeApp.playerData.id,
      direction: nextDirection
    }))
  }
  async imready() {
    try {
      if (!SnakeApp.playerData) return false
      console.log(this.WS.send)
      await this.WS.send(JSON.stringify({
        directive: 'im-ready',
        game_id: SnakeApp.playerData.game_id,
        player_id: SnakeApp.playerData.id
      }))
      console.log('vamo')
      return true
    } catch (error) {
      throw error
    }
  }
}

export default ConnectionController