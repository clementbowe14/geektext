const pool = require('../../db');
const queries = require('./queries');

//Returns the list of all books in database
const getBook = (req, res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//Creates a book into the database
const addBook = (req, res) => {
    const { ISBN, authorKey, bookName, bookDescription, bookGenre, bookPublisher, yearPublished, copiesSold } = req.body;
    pool.query(queries.addBook, [ISBN, authorKey, bookName, bookDescription, bookGenre, bookPublisher, yearPublished, copiesSold], (error, results) =>{
        if (error) throw error 
        res.status(201).send("Book added successfully.")
    });
 };

 //Returns the list of books associated with an Author
 const getBookByAuthorID = (req, res) => {
     const id = parseInt(req.params.id);
     pool.query(queries.getBookByAuthorID, [id], (error, results) => {
         if (error) throw error;
         res.status(200).json(results.rows);
     });
 };

  //Returns the details of a book by its ISBN
  const getBookByISBN = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookByISBN, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getBook,
    addBook,
    getBookByAuthorID,
    getBookByISBN,
};