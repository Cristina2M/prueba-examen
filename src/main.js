/**
 * Represents a single book in the reading list.
 */
class Book {
    /**
     * Create a book.
     * @param {string} title - The title of the book.
     * @param {string} genre - The genre of the book.
     * @param {string} author - The author of the book.
     */
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        /** @type {boolean} Indicates if the book has been read. */
        this.read = false;
        /** @type {Date|null} The date when the book was read. */
        this.readDate = null;
    }
}

/**
 * Manages the list of books and tracks reading progress.
 */
class BookList {
    constructor() {
        this.readCount = 0;
        this.unreadCount = 0;
        this.nextBook = null;
        this.currentBook = null;
        this.lastBookRead = null;
        /** @type {Book[]} Array containing all book objects. */
        this.books = [];
    }

    /**
     * Adds a book to the list.
     * @param {Book} book - The book object to add.
     */
    add(book) {
        this.books.push(book);
        this.unreadCount++;

        // Set current or next book if they are empty
        if (!this.currentBook) {
            this.currentBook = book;
        } else if (!this.nextBook) {
            this.nextBook = book;
        }
    }

    /**
     * Marks the currently active book as read.
     * Wrapper for finishBook using the currentBook property.
     */
    finishCurrentBook() {
        if (this.currentBook) {
            this.finishBook(this.currentBook);
        }
    }

    /**
     * Marks a specific book as read and updates the list state.
     * @param {Book} book - The book to mark as read.
     */
    finishBook(book) {
        if (book.read) return;

        book.read = true;
        book.readDate = new Date(Date.now());
        this.lastBookRead = book;
        this.readCount++;
        this.unreadCount--;

        // Update pointers if the finished book was current or next
        if (this.currentBook === book) {
            this.currentBook = this.nextBook;
            this.nextBook = this.books.find(b => !b.read && b !== this.currentBook) || null;
        } else if (this.nextBook === book) {
            this.nextBook = this.books.find(b => !b.read && b !== this.currentBook) || null;
        }
    }
}

/**
 * Browser-specific initialization.
 * Sets up DOM references and the main BookList instance.
 */
// --- DOM Elements & Initialization ---
if (typeof document !== 'undefined') {
    const booksGrid = document.getElementById('books-grid');
    const addBookForm = document.getElementById('add-book-form');
    const myBookList = new BookList();

    // --- UI Update Functions ---

    /**
     * Renders the library list with all books.
     * Clears the existing list and rebuilds it based on the current state.
     */
    function renderLibrary() {
        booksGrid.innerHTML = '';
        myBookList.books.forEach(book => {
            const item = document.createElement('div');
            item.className = 'book-item';

            const dateText = book.read
                ? `Read on ${book.readDate ? book.readDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}`
                : 'Not Read';

            item.innerHTML = `
                <div class="book-info">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                </div>
                <div class="book-status">
                    ${dateText}
                </div>
            `;

            // Add click listener for unread books to mark them as read
            if (!book.read) {
                item.title = 'Click to mark as read';
                item.addEventListener('click', () => {
                    myBookList.finishBook(book);
                    updateUI();
                });
            }

            booksGrid.appendChild(item);
        });
    }

    /**
     * Main function to update all UI components.
     */
    function updateUI() {
        renderLibrary();

        // Update footer stats
        const totalBooks = myBookList.books.length;
        const readBooks = myBookList.readCount;
        const statsFooter = document.getElementById('stats-footer');
        if (statsFooter) {
            statsFooter.textContent = `Books Read: ${readBooks} of ${totalBooks}`;
        }
    }

    // --- Event Handlers ---

    /**
     * Handles the form submission to add a new book.
     * @param {Event} e - The submit event.
     */
    function handleAddBook(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;

        const newBook = new Book(title, genre, author);
        myBookList.add(newBook);

        updateUI();
        addBookForm.reset();
    }

    // --- Event Listeners ---
    addBookForm.addEventListener('submit', handleAddBook);

    // --- Initial Render ---
    updateUI();
}

/**
 * Export the classes for Node.js testing environments.
 */
// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Book, BookList };
}
