let gridContainer = document.getElementById('main-grid')
let counterObj = document.getElementById('counter')
document.getElementById('imready-button').onclick = imready

let rows = []
let fruit = []
let snakeBody = []
let snakeHead = [0, 0]
let direction = 1
let nextDirection = null
let moveTime = 100
let gridSize = 25
let counter = 0
let isOnlineMatch = true
let playerData = null

function setCounter () {
    counterObj.innerText = counter
}
setCounter()

window.addEventListener('keydown', function ({key}) {
    inputHandling(key)
})

function handleInput (key) {
    if (isOnlineMatch) return onlineInputHandling(key)
    return localInputHandling(key)
}

function inputHandling (key) {
    if (key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'ArrowLeft' && key !== 'ArrowRight') return
    switch (key) {
        case 'ArrowUp':
            nextDirection = 0
            break
        case 'ArrowRight':
            nextDirection = 1
            break
        case 'ArrowDown':
            nextDirection = 2
            break
        case 'ArrowLeft':
            nextDirection = 3
            break
    }
    if (isOnlineMatch) sendDirection()
}

let gameInterval
function initGameInterval () {
    let gameInterval = setInterval(moveSnake, moveTime)
}

login()