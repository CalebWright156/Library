
// Book Class: Represents a Book
interface BookInterface {
    title: string
    author: string
    isbn: string
}

class Book implements BookInterface{
    title: string;
    author: string;
    isbn: string;

    constructor(title: string, author: string, isbn: string) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI Class: Handle UI Tasks
interface Books {
    title: string
    author: string
    isbn: string
}

class UI {
    static displayBooks() {

        const books = Store.getBooks()

        books.forEach((book: any) => UI.addBookToList(book))
    }

    static addBookToList(book: any) {
        const list: any = document.querySelector('#book-list');

        const row: any = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row)
    }

    static clearFields() {
        const clearTitle = (<HTMLInputElement>document.querySelector('#title')).value = '';
        const clearAuthor = (<HTMLInputElement>document.querySelector('#author')).value = '';
        const clearIsbn = (<HTMLInputElement>document.querySelector('#isbn')).value = '';
    }

    static showAlert(message: string, className: string) {
        const div = document.createElement('div')
        div.className = `alert  alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container?.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert')?.remove(), 2500)
    }

    static deleteBook(el: any) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books') || '')
        }

        return books
    }

    static addBook(book: any){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn: string){
        const books = Store.getBooks();

        books.forEach((book: any, index: any) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}


// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Add a Book
document.querySelector('#book-form')!.addEventListener('submit', (e) => {

    // Prevent a submit that resets
    e.preventDefault()

    const title = (<HTMLInputElement>document.querySelector('#title')).value;
    const author = (<HTMLInputElement>document.querySelector('#author')).value;
    const isbn = (<HTMLInputElement>document.querySelector('#isbn')).value;

    // Check is inputs are valid
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please enter all fields', 'danger')
    } else {
        // instantiate new book
        const book = new Book(title, author, isbn);

        // Add book to interface
        UI.addBookToList(book)

        // Add book to storage
        Store.addBook(book)

        // Show when book has been added
        UI.showAlert('Book Added', 'success')

        // Remove fields
        UI.clearFields();
    }
});


// Delete a Book
document.querySelector('#book-list')?.addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    // alert when book is removed
    UI.showAlert('Book Removed', 'success')
})






