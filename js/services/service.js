'use strict'
var gProjects


function createProjects() {
    gProjects = loadFromStorage('projects')
    if (!gProjects || !gProjects.length) {
        gProjects = [
            {
                id: "ball board",
                name: "ball board",
                title: "ball board",
                desc: "nice game that very similar to pacman",
                url: "my projects/ball-board-ex-starter/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/ball board.png"
            },
            {
                id: "chess",
                name: "chess",
                title: "chess",
                desc: "regular chess game",
                url: "my projects/chess-ex-starter/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/chess.png"
            },
            {
                id: "my book shop",
                name: "my book shop",
                title: "my book shop",
                desc: "a book shop that you can update and add any book you would like",
                url: "my projects/Day20-CRUDL-AndSomeMore/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/book shop.png"
            },
            {
                id: "the numbers game",
                name: "the numbers game",
                title: "the numbers game",
                desc: "in that game you need to click the numbers in order",
                url: "my projects/numbers game/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/the numbers game.png"
            },
            {
                id: "mine sweeper",
                name: "mine sweeper",
                title: "mine sweeper",
                desc: "my little version to mine sweeper with nice new features",
                url: "my projects/OPTIONAL Delivery2 - Tuesday 2200/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/mine sweeper.png"
            },
            {
                id: "pacman",
                name: "pacman",
                title: "Better push those boxes",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/pacman-ex-starter 2.1/index.html",
                publishedAt: _getDate(),
                labels: ["Matrixes", "keyboard events"],
                img: "img/projects/pacman.png"
            }

        ]
        saveToStorage('projects', gProjects)
    }
}

function getProjects() {
    return gProjects
}

function _getDate() {
    var date = new Date()
    return date.toLocaleDateString()
}



