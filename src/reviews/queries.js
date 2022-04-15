const getBooks = "SELECT * FROM book";
const addReview = "INSERT INTO reviews (review_ISBN, review_user, rating_score, date_stamp, review_text) VALUES ($1, $2, $3, $4, $5)";
const getReview = 'SELECT * FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE review_id = $1';
const getAllReviews = 'SELECT * FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE book.ISBN = book.ISBN';
const getReviewsDescending = 'SELECT * FROM reviews ORDER BY rating_score DESC';
const getReviewsAverage = 'SELECT AVG(rating_score) FROM reviews';

module.exports = {
    getBooks,
    getAllReviews,
    getReview,
    getReviewsDescending,
    getReviewsAverage,
    addReview,
}