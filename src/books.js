const { nanoid } = require('nanoid');

const books = [];

function addBook(book) {
    const id = nanoid();
    const finished = book.pageCount === book.readPage;
    const insertedAt = new Date().toISOString();

    const newBook = {
        id,
        ...book,
        finished,
        insertedAt,
        updatedAt: insertedAt,
    };

    books.push(newBook);
    return id;
}

function getAllBooks() {
    return books;
}

function getBookById(id) {
    return books.find((book) => book.id === id);
}

function updateBookById(id, updatedBook) {
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            ...updatedBook,
            updatedAt: new Date().toISOString(),
        };
        return true;
    }

    return false;
}

function deleteBookById(id) {
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        return true;
    }

    return false;
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
