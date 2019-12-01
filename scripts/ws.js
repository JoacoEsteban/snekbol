const httpUrl = 'http://192.168.0.42:5000'
const wsUrl = 'ws://192.168.0.42:5000'
let ws

let isConnected = false

async function login(name) {
    try {
        let resp = await axios.post(httpUrl + '/login', {
            name: name
        })
        console.log('login success', resp.data)
        playerData = resp.data
        initializeWebSocket()
        return true
    } catch (error) {
        console.error(error)
        throw error
    }
}

function initializeWebSocket() {
    ws = new WebSocket(wsUrl, 'protocolOne')

    ws.onopen = (e) => {
        console.log('connected to ws')
        isConnected = true
    }

    ws.onmessage = ({ data }) => {
        console.log('data')
        onlineInstance = JSON.parse(data)
        paintSnakes()
    }

}
function sendDirection() {
    if (!isConnected) return
    ws.send(JSON.stringify({ directive: 'direction', player_id: playerData.id, direction: nextDirection }))
}

async function imready() {
    if (!playerData) return false
    try {
        await ws.send(JSON.stringify({
            directive: 'im-ready',
            game_id: playerData.game_id,
            player_id: playerData.id
        }))
        return true
    } catch (error) {
        throw error
    }
}
