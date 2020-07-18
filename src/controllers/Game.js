export default class Game {
  constructor() {

  }
  createCells() {
    for (let i = 0; i < gridSize; i++) {
      let row = document.createElement('div')
      row.className = 'row'
      row.id = 'row-' + i
      gridContainer.appendChild(row)
      let rowObj = {
        element: row,
        cells: []
      }
      rows.push(rowObj)

      for (let o = 0; o < gridSize; o++) {
        let cell = document.createElement('div')
        cell.className = 'cell'
        cell.id = 'cell-' + o
        row.appendChild(cell)
        rows[i].cells.push(cell)
      }
    }
  }

  createFruit(fruit) {
    if (!fruit) {
      fruit[0] = Math.floor(Math.random() * 1000) % gridSize
      fruit[1] = Math.floor(Math.random() * 1000) % gridSize
    }
    fruitElement = rows[fruit[0]].cells[fruit[1]]
    fruitElement.classList.add('fruit')
  }
  removeFruit() {
    if (!fruitElement) return
    fruitElement.classList.remove('fruit')
    fruit = []
  }

  paintSnake(snake) {
    if (snake) {
      snakeHead = snake.head
      snakeBody = snake.body
    }
    rows[snakeHead[0]].cells[snakeHead[1]].classList.add('snake')
    snakeBody.forEach(coord => {
      rows[coord[0]].cells[coord[1]].classList.add('snake')
    })
  }
  clearSnake(snake) {
    if (snake) {
      snakeHead = snake.head
      snakeBody = snake.body
    }
    rows[snakeHead[0]].cells[snakeHead[1]].classList.remove('snake')
    snakeBody.forEach(coord => {
      rows[coord[0]].cells[coord[1]].classList.remove('snake')
    })
  }
  paintCell(cell) {
    rows[cell[0]].cells[cell[1]].classList.add('snake')
  }
  clearCell(cell) {
    rows[cell[0]].cells[cell[1]].classList.remove('snake')
  }

  moveSnake() {
    let goTo = nextDirection
    if (goTo === null) goTo = direction

    switch (goTo) {
      case 0:
        if (direction === 2) goTo = direction
        break
      case 1:
        if (direction === 3) goTo = direction
        break
      case 2:
        if (direction === 0) goTo = direction
        break
      case 3:
        if (direction === 1) goTo = direction
        break
    }

    let newPos = [...snakeHead]
    switch (goTo) {
      case 0:
        newPos[0]--
        break
      case 1:
        newPos[1]++
        break
      case 2:
        newPos[0]++
        break
      case 3:
        newPos[1]--
        break
    }
    if (isColliding(newPos)) return gameOver()

    snakeBody = [snakeHead, ...snakeBody]
    clearCell(snakeBody.pop())
    snakeHead = newPos
    paintCell(snakeHead)

    nextDirection = null
    direction = goTo
    checkFruit()
    paintSnake()
  }

  isColliding(coords) {
    if (coords[0] - gridSize > 0 || coords[0] < 0 || coords[1] - gridSize > 0 || coords[1] < 0) return true
    for (let i in snakeBody) {
      let part = snakeBody[i]
      if (coords[0] === part[0] && coords[1] === part[1]) return true
    }
  }
  gameOver() {
    document.getElementById('game-over').classList.add('show')
    clearInterval(gameInterval)
  }
  checkFruit() {
    if (snakeHead[0] === fruit[0] && snakeHead[1] === fruit[1]) {
      eatFruit()
      growSnake()
    }
  }

  growSnake() {
    let newCell = snakeBody.length > 0 ? [...(_.last(snakeBody))] : snakeHead
    switch (direction) {
      case 0:
        newCell[0]--
        break
      case 1:
        newCell[1]--
        break
      case 2:
        newCell[0]++
        break
      case 3:
        newCell[1]++
        break
    }
    snakeBody.push(newCell)
  }

  eatFruit() {
    counter++
    setCounter()
    removeFruit()
    createFruit()
  }

  clearBoard() {
    rows.forEach(row => {
      row.cells.forEach(cell => {
        cell.classList.remove('snake')
      })
    })
    removeFruit()
  }

  paintSnakes() {
    let {
      players,
      fruit
    } = onlineInstance
    clearBoard()
    removeFruit
    let mySnake
    players.forEach((player) => {
      if (player.id === playerData.id) mySnake = player.snake
      paintSnake(player.snake)
    })
    setCounter(mySnake.counter)
    createFruit(fruit)
  }

  init() {


    createCells()
    if (!isOnlineMatch) {
      createFruit()
      paintSnake()
      moveSnake()
    }
  }
}