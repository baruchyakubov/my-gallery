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
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/ball-board-ex-starter/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: "chess",
                name: "chess",
                title: "chess",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/chess-ex-starter/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: "my book shop",
                name: "my book shop",
                title: "my book shop",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/Day20-CRUDL-AndSomeMore/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: "sokoban",
                name: "Sokoban",
                title: "Better push those boxes",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/numbers game/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: "sokoban",
                name: "Sokoban",
                title: "Better push those boxes",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/OPTIONAL Delivery2 - Tuesday 2200/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            },
            {
                id: "sokoban",
                name: "Sokoban",
                title: "Better push those boxes",
                desc: "lorem ipsum lorem ipsum lorem ipsum",
                url: "my projects/pacman-ex-starter 2.1/index.html",
                publishedAt: 1448693940000,
                labels: ["Matrixes", "keyboard events"],
            }

        ]
        saveToStorage('projects', gProjects)
    }
}

function getProjects() {
    return gProjects
}



