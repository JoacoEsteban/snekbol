export default class App {
  constructor () {
    this.gridContainer = $('#main-grid')
    this.counterObj = $('#counter')
    this.rows = []
    this.fruit = []
    this.fruitElement = null
    this.snakeBody = []
    this.snakeHead = [0, 0]
    this.direction = 1
    this.nextDirection = null
    this.moveTime = 100
    this.gridSize = 25
    this.counter = 0
    this.isOnlineMatch = true
    this.playerData = null

    this.onlineInstance = null
  }

  setCounter(c) {
    if (!c) c = counter
    counterObj.innerText = c
  }
  handleInput(key) {
    if (isOnlineMatch) return onlineInputHandling(key)
    return localInputHandling(key)
  }

  inputHandling(key) {
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

  initGameInterval() {
    this.gameInterval = setInterval(moveSnake, moveTime)
  }
  init() {
    setCounter()
    window.addEventListener('keydown', function ({
      key
    }) {
      inputHandling(key)
    })
  }
}