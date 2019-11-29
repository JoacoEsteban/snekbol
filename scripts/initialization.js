let gridContainer = document.getElementById('main-grid')
let counterObj = document.getElementById('counter')
let rows = []
let fruit = []
let snakeBody = []
let snakeHead = [0, 0]
let direction = 1
let nextDirection = null
let moveTime = 250
let gridSize = 25
let counter = 0

function setCounter () {
    counterObj.innerText = counter
}
setCounter()

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


