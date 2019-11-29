let gridContainer = document.getElementById('main-grid')


window.addEventListener('keydown', function (event) {
    let key = event.key
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
})


let rows = []
let fruit = []
let snakeCoords = [0, 0] 
let direction = 1
let nextDirection = null

let moveTime = 75

function createCells () {
    for (let i = 0; i < 25; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        row.id = 'row-' + i
        gridContainer.appendChild(row)
        let rowObj = {
            element: row,
            cells: []
        }
        rows.push(rowObj)
        
        for (let o = 0; o < 25; o++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.id = 'cell-' + o
            row.appendChild(cell)
            rows[i].cells.push(cell)
        }
    }
}

function createFruit() {
    fruit[0] = Math.floor(Math.random() * 1000) % 25
    fruit[1] = Math.floor(Math.random() * 1000) % 25
    rows[fruit[0]].cells[fruit[1]].classList.add('fruit')
}

function setSnake () {
    rows[snakeCoords[0]].cells[snakeCoords[1]].classList.add('snake')
}
function clearSnake () {
    rows[snakeCoords[0]].cells[snakeCoords[1]].classList.remove('snake')
}

function moveSnake () {
    clearSnake()
    let goTo = nextDirection
    if (goTo === null) goTo = direction

    console.log(direction, goTo)
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

    switch (goTo) {
        case 0:
            snakeCoords[0]--
            break
        case 1:
            snakeCoords[1]++
            break
        case 2:
            snakeCoords[0]++
            break
        case 3:
            snakeCoords[1]--
            break
    }

    nextDirection = null
    direction = goTo
    setSnake()
}

setInterval(moveSnake, moveTime)

createCells()
createFruit()
setSnake()
moveSnake()