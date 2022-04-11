const res = require('express/lib/response');
const pool = require('../../db');
const queries = require('./queries');

const getBooks = (req, res) =>{
    pool.query(queries.getBooks, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookOwnedByUserId = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    pool.query(queries.getBookOwnedByUserId, [user_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getReviews = (req, res) =>{
    pool.query(queries.getReviews, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getReview = (req, res) =>{
    const review_id = parseInt(req.params.review_id);
    pool.query(queries.getReview, [review_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//Get all reviews by highest ratings
const getBooksReviewsRatingDescending = (req, res) =>{
    pool.query(queries.getBooksReviewsRatingDescending, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//Get book's reviews by highest rating.
const getBookReviewsRatingDescending = (req, res) =>{
    const ISBN = parseInt(req.params.ISBN);
    pool.query(queries.getBookReviewsRatingDescending, [ISBN], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//Gets all book's average rating
const getBooksAverageRating = (req, res) =>{
    pool.query(queries.getBooksAverageRating, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//Get specific book average rating
const getBookAverageRating = (req, res) =>{
    const ISBN = parseInt(req.params.ISBN);
    pool.query(queries.getBookAverageRating, [ISBN], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addReview = (req, res) => {
    const { review_ISBN, review_user, rating_score, date_stamp, review_text} = req.body;
    //Checks if user owns book
    pool.query(queries.checkBookOwnedByUserId, [review_user, review_ISBN], (error, results) =>{
        console.log(error)
        if(results.rows && results.rows.length === 0){
            return res.send("Cannot write review or comments unless you own the book.")
        }
            pool.query(queries.addReview, [review_ISBN, review_user, rating_score, date_stamp, review_text], (error, results) =>{
                if(rating_score < 0 || rating_score > 5){
                    return res.send("Rating score needs to be between 1 and 5")
                } else{
                res.status(201).send("Review created!")
                }
            });
    });
};
 
const addRating = (req, res) => {
    const { review_ISBN, review_user, rating_score, date_stamp} = req.body;
    //Checks if user owns book
    pool.query(queries.checkBookOwnedByUserId, [review_user, review_ISBN], (error, results) =>{
        if(results.rows && results.rows.length === 0){
            return res.send("Cannot write review or comments unless you own the book.")
        }
            pool.query(queries.addRating, [review_ISBN, review_user, date_stamp, rating_score], (error, results) =>{
                if(rating_score < 0 || rating_score > 5){
                    return res.send("Rating score needs to be between 1 and 5")
                } else{
                res.status(201).send("Review created!")
                }
            });
    });
};

const addComment = (req, res) => {
    const { review_ISBN, review_user, review_text, date_stamp} = req.body;
    //Checks if user owns book
    pool.query(queries.checkBookOwnedByUserId, [review_user, review_ISBN], (error, results) =>{
        if(results.rows && results.rows.length === 0){
            return res.send("Cannot write review or comments unless you own the book.")
        }
            pool.query(queries.addComment, [review_ISBN, review_user, date_stamp, review_text], (error, results) =>{
                if (error) throw error 
                res.status(201).send("Review created!")
            });
    });
};

module.exports = {
    getBooks,
    getReviews,
    getReview,
    getBooksReviewsRatingDescending,
    getBookReviewsRatingDescending,
    getBooksAverageRating,
    getBookAverageRating,  
    addRating,
    addComment,
    addReview,
    getBookOwnedByUserId,
};