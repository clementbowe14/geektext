const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/genre/:bookgenre", controller.sortBooksByGenre);
router.get("/copiessold", controller.sortByBestSelling);
router.get("/:pagenum", controller.getAllBooks);
router.get("/rating/:rating", controller.sortBooksByRating);

module.exports = router;