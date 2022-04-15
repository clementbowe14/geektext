const { Router } = require('express');
const controller = require ('./controller');

const router = Router();

router.get("/", controller.getBooks);

// Getting review and reviews
router.get("/:review_id/reviews",controller.getAllReviews);
router.get("/:review_id/review",controller.getReview);

//Get review with highest rating
router.get("/:review_id/reviews/highest", controller.getReviewsDescending);
//Get reviews average rating
router.get("/:review_id/reviews/average", controller.getReviewsAverage);

// Adding review
router.post('/review', controller.addReview);

module.exports = router;
