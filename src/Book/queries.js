const getBook = 'SELECT * FROM "Book"';
const addBook = 'INSERT INTO "Book" ("ISBN","authorKey", "bookName", "bookDescription", "bookGenre", "bookPublisher", "yearPublished", "copiesSold") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
const getBookByAuthorID = 'SELECT * FROM "Book" WHERE "authorKey" = $1';
const getBookByISBN = 'SELECT * FROM "Book" WHERE "ISBN" = $1';

module.exports = {
    getBook,
    addBook,
    getBookByAuthorID,
    getBookByISBN,
};
