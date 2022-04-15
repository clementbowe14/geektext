const{ Router } =  require("express");
const controller = require('./controller');

const router = Router();

router.get("/cart/admin", controller.getShoppingCart);

router.get("/cart/:id/books", controller.getBooksInCart);

router.get("/cart/:id/details", controller.getCartDetails);

router.post("/:user_id/create",controller.createShoppingCart);

router.delete("/cart/:id/delete",controller.deleteCart);

router.put("/cart/:id/update",controller.updateCart);


module.exports = router;
