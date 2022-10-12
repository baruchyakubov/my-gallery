'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '@'
// const CHERRY = 'cherry'
const CHERRY_IMG = `<img src ="cherry.jpg" alt=".">`
// const CHERRY_IMG = `🍒`
var gIntervalCherry
var gFoodCounter = 0
var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'none'
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(addCherry, 15000)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFoodCounter++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFoodCounter--
            }
        }
    }
    board[8][1] = SUPER_FOOD
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gFoodCounter -= 4

    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (gFoodCounter === 0) {
        alert('you win!')
        gameOver()
    }
}

function gameOver() {
    clearInterval(gIntervalCherry)
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'block'
    gGame.score = 0
}

function addCherry() {
    var emptyArr = getEmptyCells()
    if (emptyArr.length > 0) {
        var emptyCell = emptyArr[getRandomInt(0, emptyArr.length)]
        gBoard[emptyCell.i][emptyCell.j] = CHERRY_IMG
        console.table(gBoard);
        renderCell({ i: emptyCell.i, j: emptyCell.j }, CHERRY_IMG)
    }

}

function getEmptyCells() {
    var emptyArr = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) emptyArr.push({ i, j })
        }
    }
    return emptyArr
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
