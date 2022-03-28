const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello world !");
});

router.get("/user/:userid/wishlist/:wishname", controller.getBooks);
router.post("/user/:userid/wishlist/:wishname", controller.addToWishlist);
router.get("/user/:userid/wishlist", controller.getWishLists);
router.post("/user/:userid/wishlist", controller.addEmptyWishlist);

module.exports = router;
