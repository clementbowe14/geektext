const getAuthor = 'SELECT * FROM "Author"';
const addAuthor = 'INSERT INTO "Author" ("authorKey","firstName", "lastName", "publisher", "biography") VALUES ($1,$2,$3,$4,$5)';

module.exports = {
    getAuthor,
    addAuthor,
};