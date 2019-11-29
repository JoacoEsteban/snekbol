let gridContainer = document.getElementById('main-grid')

let rows = []
let fruit = []

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
    fruit.row = Math.floor(Math.random() * 1000) % 25
    fruit.cell = Math.floor(Math.random() * 1000) % 25
    rows[fruit.row].cells[fruit.cell].classList.add('fruit')
}

createCells()
createFruit()