const getShoppingCart = "SELECT * FROM shoppingcart"; // gets all shopping cart

const getBooksInCart = "SELECT ISBN FROM shoppingcart WHERE cart_id = $1"; //gets all the books in shopping cart

const getCartDetails = "SELECT * FROM shoppingcart WHERE cart_id = $1";

const createShoppingCart = "INSERT INTO shoppingcart (cart_id, user_id, ISBN, quantity, price) VALUES (DEFAULT,$1,$2,$3,$4)"

const checkCartExists = "SELECT FROM shoppingcart WHERE user_id = $1";

const deleteCart = "DELETE FROM shoppingcart WHERE cart_id = $1";

const updateCart = "UPDATE shoppingcart SET ISBN = $2, quantity = $3 , price = $4 WHERE cart_id = $1";


module.exports = {
    getShoppingCart,
    getBooksInCart,
    getCartDetails,
    checkCartExists,
    createShoppingCart,
    deleteCart,
    updateCart
};
