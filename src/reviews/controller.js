const pool = require('../../db');
const queries = require('./queries');

const getBooks = (req, res) =>{
    pool.query(queries.getBooks, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getAllReviews = (req, res) =>{
    pool.query(queries.getAllReviews, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
 
const getReview = (req, res) =>{
    const review_id = parseInt(req.params.review_id);
    pool.query(queries.getReview,[review_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getReviewsDescending = (req, res) =>{
    pool.query(queries.getReviewsDescending, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getReviewsAverage = (req, res) =>{
    pool.query(queries.getReviewsAverage, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
 
const addReview = (req, res) => {
    const { review_ISBN, review_user, rating_score, date_stamp, review_text} = req.body;
    pool.query(queries.addReview, [review_ISBN, review_user, rating_score, date_stamp, review_text], (error, results) =>{
        if (error) throw error 
        res.status(201).send("Review created!")
    });
 };

module.exports = {
    getBooks,
    getAllReviews,
    getReview,
    getReviewsDescending,
    getReviewsAverage,
    addReview,
};
