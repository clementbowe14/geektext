const { Router } = require('express');
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAuthor);
router.post("/", controller.addAuthor);

module.exports = router;


