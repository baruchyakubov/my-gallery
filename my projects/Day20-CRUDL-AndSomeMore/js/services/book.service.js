'use strict'
const STORAGE_KEY = 'book-list'
const gBooksNames = ['harry potter', 'persy jackson', 'it ends with us', 'the ballad of newer after', 'the midnight library','יומנן של חנון','חוכמת האדישות']
const PAGE_SIZE = 5

var gPageIdx = 0
var gBooks
var gFilterBy = {maxPrice: 50 , minRate: 0 , bookName:''}
var gOpenDescription = {isOpen: false , bookId:0}


function getBooks(){
    var books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
        book.price <= gFilterBy.maxPrice && book.name.includes(gFilterBy.bookName))

        const startIdx = gPageIdx * PAGE_SIZE
        books = books.slice(startIdx, startIdx + PAGE_SIZE)
        return books
}

_createBooks()

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < gBooksNames.length; i++) {
            var name = gBooksNames[i]
            books.push(_createBook(name, i + 1, getRandomIntInclusive(10, 51) ))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name, id, price) {
    return {
        id,
        name,
        price: price,
        rate: 0,
        isOpenDescription: false
    }
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function AddBook(name, price) {
    gBooks.push(_createBook(name, gBooks.length + 1, price ))
    _saveBooksToStorage()
}

function getBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    return gBooks[bookIdx]
}

function getDescription() {
    return makeLorem()
}

function updateBook(bookId, updatedPrice) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks[bookIdx].price = updatedPrice 
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function increaseRate(book) {
    if (book.rate === 10) return
    book.rate++
    _saveBooksToStorage()
}

function decreaseRate(book) {
    if (book.rate === 0) return
    book.rate--
    _saveBooksToStorage()
}

function setBookFilter(filterBy = {}){
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if(filterBy.bookName !== undefined) gFilterBy.bookName = filterBy.bookName
    return gFilterBy
}

function setIsOpenDescription(bookId){
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
   if(gBooks[bookIdx].isOpenDescription === false){
    gBooks[bookIdx].isOpenDescription = true
    gOpenDescription.bookId = bookId
   } 
   else{
    gBooks[bookIdx].isOpenDescription = false
    gOpenDescription.bookId = 0
   } 
   _saveBooksToStorage()
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}





