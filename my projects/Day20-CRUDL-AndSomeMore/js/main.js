'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 50,
        minRate: +queryStringParams.get('minRate') || 0,
        bookName: queryStringParams.get('bookName') || ''
    }


    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.bookName) return


    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.filter-by-txt').value = filterBy.bookName
    setBookFilter(filterBy)

}

function renderBooks() {
    document.querySelector('.book-list').innerHTML = `<button onclick="onAddBook()" class = "btn add">add book</button>` +
        `<table border="1" class="table-list"></table>`
    var topList = `<tr>
         <th>id</th>
         <th>name</th>
         <th>price</th>
         <th colspan="3">actions</th>
    </tr>`
    document.querySelector('.table-list').innerHTML += topList
    var books = getBooks()
    console.log(books);
    var list = books.map(book => {
        return `<tr>
         <td>${book.id}</td>    
         <td>${book.name}</td>       
         <td>${book.price + '$'}</td>       
         <td><butoon onclick="onOpenDescription(${book.id})" class="btn read">read</button></td>       
         <td><butoon onclick="onUpdateBook(${book.id})" class="btn update">update</button></td>       
         <td><butoon onclick="onRemoveBook(${book.id})" class="btn delete">delete</button></td>       
    </tr>`
    })
    document.querySelector('.table-list').innerHTML += list.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    document.querySelector('.table-list').remove()
    renderBooks()
}

function onUpdateBook(bookId) {
    var updatedPrice = +prompt('enter price (between 10$-51$):')
    while (updatedPrice > 50 || updatedPrice < 10) {
        updatedPrice = +prompt('enter price (between 10$-51$):')
    }
    updateBook(bookId, updatedPrice)
    document.querySelector('.table-list').remove()
    renderBooks()
}

function onAddBook() {
    var name = prompt('enter name:')
    var price = +prompt('enter price (between 10$-51$):')
    while (price > 50 || price < 10) {
        price = +prompt('enter price (between 10$-51$):')
    }
    AddBook(name, price)
    renderBooks()
}

function onOpenDescription(bookId) {
    if (gOpenDescription.isOpen === true) return
    gOpenDescription.isOpen = true
    document.querySelector('.description').classList.add('open')
    var book = getBook(bookId)
    setIsOpenDescription(bookId)

    document.querySelector('.description').innerHTML += `<button onclick="onCloseDescription(${bookId})" class="btn close">X</button>`
    document.querySelector('h2').innerText = `${book.name} , price: ${book.price + '$'}`
    document.querySelector('p').innerText = getDescription()
    document.querySelector('.rate').innerHTML = `
    <button onclick="onDecreaseRate(${bookId})" class="btn low-rate">-</button>
    <div class="rate-value">${book.rate}</div>
    <button onclick="onIncreaseRate(${bookId})" class="btn high-rate">+</button>`
}

function onIncreaseRate(bookId) {
    var book = getBook(bookId)
    increaseRate(book)
    document.querySelector('.rate-value').innerText = `${book.rate}`
}

function onDecreaseRate(bookId) {
    var book = getBook(bookId)
    decreaseRate(book)
    document.querySelector('.rate-value').innerText = `${book.rate}`
}

function onCloseDescription(bookId) {
    gOpenDescription.isOpen = false
    setIsOpenDescription(bookId)
    document.querySelector('.description').classList.remove('open')
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&bookName=${filterBy.bookName}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}


function onNextPage() {
    nextPage()
    renderBooks()
}



