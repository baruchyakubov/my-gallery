'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

const BALL = 'BALL'
const GAMER = 'GAMER'
const GLUE = 'GLUE'

const GAMER_IMG = '\n\t\t<img src="img/gamer.png">\n'
const BALL_IMG = '\n\t\t<img src="img/ball.png">\n'
const GLUE_IMG = '\n\t\t<img src="img/candy.png">\n'
const NONE_IMG = '\n\t\t<img>\n'

// Model:
var gBoard = []
var gGamerPos
var gRandomBall = 0
var gCounterBall = 0
var gRandomGlue
var gCollected = 0
var gCanMove = true
const sound = new Audio('pop-94319.mp3')

function initGame() {
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'none'
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)
    gRandomBall = setInterval(createRandomBalls, 1500)
    gRandomGlue = setInterval(createRandomGlue, 5000)
}

// getEmptyCell()

function createRandomBalls() {
    var cols = getRandomInt(1, 11)
    var rows = getRandomInt(1, 9)
    if (gBoard[rows][cols].gameElement !== GAMER && gBoard[rows][cols].gameElement !== BALL && gBoard[rows][cols].gameElement !== GLUE) {
        gCounterBall++
        gBoard[rows][cols].gameElement = BALL
        renderCell({ i: rows, j: cols }, BALL_IMG)
    }


}

function buildBoard() {
    var board = []

    // TODO: Create the Matrix 10 * 12 
    board = createMat(10, 12)

    // TODO: Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if ((i === 0 || i === board.length - 1) && j !== 5) board[i][j].type = WALL
            else if ((j === 0 || j === board[i].length - 1) && i !== 5) board[i][j].type = WALL
        }
    }

    // TODO: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER






    console.log(board);
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})">`

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log('strHTML is:')
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}

// Move the player to a specific location
function moveTo(i, j) {

    var targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i)
    var jAbsDiff = Math.abs(j - gGamerPos.j)

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
        if (targetCell.gameElement === GLUE) {
            targetCell.gameElement === GAMER
            gCanMove = false
            setTimeout(() => {
                gCanMove = true
            }, 3000);
        }

        if (targetCell.gameElement === BALL) {
            gCounterBall--
            gCollected++
            sound.play()
            if (gCounterBall === 0) {
                clearInterval(gRandomBall)
                alert('you have collected ' + gCollected + ' balls')
                gBoard = []
                gGamerPos = {}
                gRandomBall = 0
                gCounterBall = 0
                gCollected = 0
                var elBtn = document.querySelector('button')
                elBtn.style.display = 'block'
            }
        }

        var GamerPos2 = { i, j }
        if (GamerPos2.i === 0 && GamerPos2.j === 5) {
            i = 9
        } else if (GamerPos2.i === 9 && GamerPos2.j === 5) {
            i = 0
        } else if (GamerPos2.i === 5 && GamerPos2.j === 0) {
            j = 11
        } else if (GamerPos2.i === 5 && GamerPos2.j === 11) {
            j = 0
        }

        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null

        // DOM:
        renderCell(gGamerPos, '')

        // Update the Model:
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }

        // DOM:
        renderCell(gGamerPos, GAMER_IMG)




    } else console.log('TOO FAR', iAbsDiff, jAbsDiff)

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i
    var j = gGamerPos.j


    switch (event.key) {
        case 'ArrowLeft':
            if (gCanMove) moveTo(i, j - 1)
            break;
        case 'ArrowRight':
            if (gCanMove) moveTo(i, j + 1)
            break;
        case 'ArrowUp':
            if (gCanMove) moveTo(i - 1, j)
            break;
        case 'ArrowDown':
            if (gCanMove) moveTo(i + 1, j)
            break;

    }



}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function createRandomGlue() {
    var cols = getRandomInt(1, 11)
    var rows = getRandomInt(1, 9)
    if (gBoard[rows][cols].gameElement !== GAMER && gBoard[rows][cols].gameElement !== BALL
        && gBoard[rows][cols].gameElement !== GLUE) {
        gBoard[rows][cols].gameElement = GLUE
        renderCell({ i: rows, j: cols }, GLUE_IMG)
    }
    setTimeout(() => {
        gBoard[rows][cols].gameElement = FLOOR
        renderCell({ i: rows, j: cols }, NONE_IMG)
    }, 5000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

