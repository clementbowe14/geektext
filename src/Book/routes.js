const { Router } = require('express');
const controller = require("./controller");

const router = Router();

router.get("/", controller.getBook);
router.post("/", controller.addBook);
router.get("/authorID/:id", controller.getBookByAuthorID);
router.get("/isbn/:id", controller.getBookByISBN);

module.exports = router;