// const { nanoid } = require('nanoid');
const { addBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require('./books');

function addBookHandler(request, h) {
    try {
        const bookId = addBook(request.payload);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId,
            },
        });
        response.code(201);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
}

function getAllBooksHandler() {
    return {
        status: 'success',
        data: {
            books: getAllBooks(),
        },
    };
}

function getBookByIdHandler(request, h) {
    const { bookId } = request.params;
    const book = getBookById(bookId);
    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

function updateBookByIdHandler(request, h) {
    const { bookId } = request.params;

    try {
        if (updateBookById(bookId, request.payload)) {
            return {
                status: 'success',
                message: 'Buku berhasil diperbarui',
            };
        }

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
}

function deleteBookByIdHandler(request, h) {
    const { bookId } = request.params;

    if (deleteBookById(bookId)) {
        return {
            status: 'success',
            message: 'Buku berhasil dihapus',
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};