const assert = require('assert');
const { Book, BookList } = require('../src/main.js');

console.log('Running tests...');

// Test 1: Book Creation
try {
    const book = new Book('1984', 'Dystopian', 'George Orwell');
    assert.strictEqual(book.title, '1984');
    assert.strictEqual(book.genre, 'Dystopian');
    assert.strictEqual(book.author, 'George Orwell');
    assert.strictEqual(book.read, false);
    assert.strictEqual(book.readDate, null);
    console.log('✅ Test 1 Passed: Book Creation');
} catch (e) {
    console.error('❌ Test 1 Failed:', e.message);
}

// Test 2: Adding Books to BookList
try {
    const list = new BookList();
    const book1 = new Book('Book 1', 'Genre', 'Author');
    list.add(book1);

    assert.strictEqual(list.books.length, 1);
    assert.strictEqual(list.unreadCount, 1);
    assert.strictEqual(list.readCount, 0);
    assert.strictEqual(list.currentBook, book1);
    console.log('✅ Test 2 Passed: Adding Books');
} catch (e) {
    console.error('❌ Test 2 Failed:', e.message);
}

// Test 3: Finishing a Book
try {
    const list = new BookList();
    const book1 = new Book('Book 1', 'Genre', 'Author');
    const book2 = new Book('Book 2', 'Genre', 'Author');

    list.add(book1);
    list.add(book2);

    // Initially
    assert.strictEqual(list.currentBook, book1);
    assert.strictEqual(list.nextBook, book2);

    // Finish book 1
    list.finishBook(book1);

    assert.strictEqual(book1.read, true);
    assert.ok(book1.readDate instanceof Date);
    assert.strictEqual(list.readCount, 1);
    assert.strictEqual(list.unreadCount, 1);
    assert.strictEqual(list.lastBookRead, book1);

    // Pointers should update
    assert.strictEqual(list.currentBook, book2);
    assert.strictEqual(list.nextBook, null); // No more unread books

    console.log('✅ Test 3 Passed: Finishing Books');
} catch (e) {
    console.error('❌ Test 3 Failed:', e.message);
}

console.log('Tests finished.');
