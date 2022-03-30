const pool = require('../../db');
const queries = require('./queries');

const getAuthor = (req, res) => {
    pool.query(queries.getAuthor, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addAuthor = (req, res) => {
    const { authorKey, firstName, lastName, publisher, biography} = req.body;
    pool.query(queries.addAuthor, [authorKey, firstName, lastName, publisher, biography], (error, results) =>{
        if (error) throw error 
        res.status(201).send("Author added successfully.")
    });
 };

module.exports = {
    getAuthor,
    addAuthor,
};