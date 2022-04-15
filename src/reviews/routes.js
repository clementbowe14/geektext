const { Router } = require('express');
const controller = require ('./controller');

const router = Router();

//Get all books information
router.get("/", controller.getBooks);

//Displays purchased book by user id and username.
router.get("/:user_id/owned", controller.getBookOwnedByUserId);

//Get all reviews
router.get("/reviews", controller.getReviews);

//Get all book's reviews by highest rating
router.get("/reviews/highest", controller.getBooksReviewsRatingDescending);

//Get specific book's reviews by highest rating.
router.get("/:ISBN/reviews/highest", controller.getBookReviewsRatingDescending);

//Get all book's by average rating
router.get("/reviews/average", controller.getBooksAverageRating);

//Get specific book's average rating
router.get("/:ISBN/reviews/average", controller.getBookAverageRating);

//Get specific review from review id.
router.get("/reviews/:review_id", controller.getReview);

//Add review
router.post('/review', controller.addReview);

//Add comment
router.post('/rating', controller.addRating);

//Add rating
router.post('/comment', controller.addComment);

module.exports = router;