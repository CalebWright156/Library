"use strict";
var _a;
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
        list.appendChild(row);
    }
    static clearFields() {
        const clearTitle = document.querySelector('#title').value = '';
        const clearAuthor = document.querySelector('#author').value = '';
        const clearIsbn = document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert  alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container === null || container === void 0 ? void 0 : container.insertBefore(div, form);
        setTimeout(() => { var _a; return (_a = document.querySelector('.alert')) === null || _a === void 0 ? void 0 : _a.remove(); }, 2500);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}
// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books') || '');
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent a submit that resets
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // Check is inputs are valid
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please enter all fields', 'danger');
    }
    else {
        // instantiate new book
        const book = new Book(title, author, isbn);
        // Add book to interface
        UI.addBookToList(book);
        // Add book to storage
        Store.addBook(book);
        // Show when book has been added
        UI.showAlert('Book Added', 'success');
        // Remove fields
        UI.clearFields();
    }
});
// Delete a Book
(_a = document.querySelector('#book-list')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    // alert when book is removed
    UI.showAlert('Book Removed', 'success');
});
