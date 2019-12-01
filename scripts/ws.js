const httpUrl = 'http://localhost:5000'
const wsUrl = 'ws://localhost:5000'
let ws

let isConnected = false

async function login() {
    try {
        let resp = await axios.post(httpUrl + '/login', {
            name: 'Cacho'
        })
        console.log('login sucess', resp.data)
        playerData = resp.data
        initializeWebSocket()
    } catch (error) {
        console.error(error)
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
    if (!playerData) return
    ws.send(JSON.stringify({
        directive: 'im-ready',
        game_id: playerData.game_id,
        player_id: playerData.id
    }))
}
