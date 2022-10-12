'use strict'

const PACMAN = '😷';
var gPacman;
var gDeadArr = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        // currCellContent: SUPER_FOOD
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCounter--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === FOOD) gFoodCounter--
    if (nextCell === WALL) return
    if (nextCell === FOOD || nextCell === SUPER_FOOD) updateScore(1)
    if (nextCell === CHERRY_IMG) updateScore(10)
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }

    if (gPacman.isSuper && nextCell === SUPER_FOOD) {
        return
    }

    if (gPacman.isSuper && nextCell === GHOST) {
        for (var d = 0; d < gGhosts.length; d++) {
            if (nextLocation.i === gGhosts[d].location.i && nextLocation.j === gGhosts[d].location.j) {
                var deletedGhost = gGhosts.splice(d, 1)[0]
                // console.log(deletedGhost);
            }
        }

    }
    if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
        var arr = gGhosts.slice()
        gPacman.isSuper = true
        // for (var i = 0; i < 3; i++) {
        //     gGhosts[i].color = 'blue'
        // }
        if (gFoodCounter === 0) {
            alert('you win!')
            gameOver()
        }

        setTimeout(() => {
            gGhosts = arr.slice()
            console.log(gGhosts);
            for (var i = 0; i < 3; i++) {
                gGhosts[i].color = getRandomColor()
            }
            gPacman.isSuper = false
        }, 5000);

    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}