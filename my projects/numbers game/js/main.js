'use strict'
const TABLE_ROWS = 6
const TABLE_COLS = 6

var gIsWon = false
var gCounterClicked = 1
var gNumbers = []
var gFullNum = ''
var gElDiv = document.querySelector('div')
var elTable = document.querySelector('table')

function initGame(elBtn) {
    elBtn.style.display = 'none'
    createNumbers()
    createBoard()
}


function createBoard() {
    var tblHTML = ''
    for (var i = 0; i < TABLE_ROWS; i++) {
        tblHTML += `<tr>`
        for (var j = 0; j < TABLE_COLS; j++) {
            var randomNum = returnRandomNun()
            tblHTML += `<td onclick="checkAnswer(${randomNum},this)">${randomNum}</td>`
        }
        elTable.innerHTML = tblHTML
    }
}

function checkAnswer(num, elTd) {
    if (num === gCounterClicked) {
        gCounterClicked++
        elTd.style.backgroundColor = 'rgb(77, 77, 23)'
    }
    if (gCounterClicked === TABLE_COLS * TABLE_ROWS + 1) {
        elTable.innerHTML = ''
        gIsWon = false
        gCounterClicked = 1
        gNumbers = []
        var elBtn = document.querySelector('button')
        elBtn.style.display = 'block'
        elBtn.innerText = 'restart'
        clearInterval(gTimer)
        gElDiv.style.display = 'none'
        alert('your time is: ' + gFullNum + ' seconds!')
    }
}


function createNumbers() {
    for (var i = 1; i <= TABLE_COLS * TABLE_ROWS; i++) {
        gNumbers.push(i)
    }
}

function returnRandomNun() {
    var randomNum = gNumbers.splice(getRandomInt(1, gNumbers.length - 1), 1)
    return randomNum
}
var gTimer = 0
function setTimer() {
    var b = 0
    var a = Date.now()
    gTimer = setInterval(() => {
        gElDiv.style.display = 'block'
        var b = Date.now()
        var seconds = `${Math.floor((b - a) / 1000)}`
        var miliScn = `${((b - a) / 1000) - Math.floor((b - a) / 1000)}`
        gFullNum = `${(+seconds) + (+miliScn)}`
        while (gFullNum.length < seconds.length + 4) {
            if (gFullNum.length === seconds.length) {
                gFullNum += '.000'
                break
            }
            gFullNum += '0'
        }
        gElDiv.innerHTML = `TIMER: ${gFullNum}`
    }, 37)

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
