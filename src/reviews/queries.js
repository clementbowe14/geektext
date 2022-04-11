const getBooks = "SELECT * FROM book";
const addRating = "INSERT INTO reviews (review_ISBN, review_user, date_stamp, rating_score) VALUES ($1, $2, $3, $4)";
const addComment = "INSERT INTO reviews (review_ISBN, review_user, date_stamp, review_text) VALUES ($1, $2, $3, $4)";
const addReview = "INSERT INTO reviews (review_ISBN, review_user, rating_score, date_stamp, review_text) VALUES ($1, $2, $3, $4, $5)";
const getReview = 'SELECT review_id, review_ISBN, bookName, review_user, username, date_stamp, rating_score, review_text FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE review_id = $1';
const getReviews = 'SELECT review_id, review_ISBN, bookName, review_user, username, date_stamp, rating_score, review_text FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE book.ISBN = book.ISBN';
const getBooksAverageRating = 'SELECT ISBN, bookName, AVG(rating_score)::NUMERIC(10,2) FROM reviews INNER JOIN book on reviews.review_ISBN = book.ISBN GROUP BY ISBN, book.bookName ORDER BY ISBN';
const getBookAverageRating = 'SELECT ISBN, bookName, AVG(rating_score)::NUMERIC(10,2) FROM reviews INNER JOIN book on reviews.review_ISBN = book.ISBN WHERE book.ISBN = $1 GROUP BY ISBN, book.bookName ORDER BY ISBN';
const checkBookOwnedByUserId = 'SELECT user_id, username, purchased_book, bookName FROM PurchasedBook INNER JOIN "User" ON PurchasedBook.purchased_user_id = "User".user_id INNER JOIN book ON PurchasedBook.purchased_book = book.ISBN WHERE user_id = $1 AND purchased_book = $2';
const getBookOwnedByUserId = 'SELECT user_id, username, purchased_book, bookName FROM PurchasedBook INNER JOIN "User" ON PurchasedBook.purchased_user_id = "User".user_id INNER JOIN book ON PurchasedBook.purchased_book = book.ISBN WHERE user_id = $1';
const getBooksReviewsRatingDescending = 'SELECT review_id, rating_score, review_ISBN, bookName, review_user, username, date_stamp, review_text FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE book.ISBN = book.ISBN AND rating_score IS NOT NULL ORDER BY review_ISBN, rating_score DESC';
const getBookReviewsRatingDescending = 'SELECT review_id, rating_score, review_ISBN, bookName, review_user, username, date_stamp, review_text FROM reviews JOIN book ON reviews.review_ISBN = book.ISBN JOIN "User" ON reviews.review_user = "User".user_id WHERE book.ISBN = $1 AND rating_score IS NOT NULL ORDER BY review_ISBN, rating_score DESC';


module.exports = {
    getBooks,
    addRating,
    addComment,
    addReview,
    getReviews,
    getReview,
    getBooksReviewsRatingDescending,
    getBookReviewsRatingDescending,
    getBooksAverageRating,
    getBookAverageRating,
    checkBookOwnedByUserId,
    getBookOwnedByUserId,
};