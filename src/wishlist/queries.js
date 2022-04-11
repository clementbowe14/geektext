const getBooksFromWishlist =
  "SELECT B.isbn, B.bookname, B.bookprice FROM wishlist AS W INNER JOIN book AS B ON W.isbn = B.isbn WHERE W.user_id = $1 AND W.wishlist_name = $2 AND NOT B.isbn = 0";
const checkWishlists = "SELECT * FROM wishlist WHERE user_id=$1";
const addEmptyWishlist = "INSERT INTO wishlist(wishlist_id,wishlist_name, user_id, isbn) values(DEFAULT,$1,$2,0)";
const delWishlist = "DELETE FROM wishlist WHERE wishlist_name = $1 AND user_id = $2";
const addToWishlist = "INSERT INTO wishlist(wishlist_id,wishlist_name, user_id, isbn) values(DEFAULT,$1,$2,$3)";
const delFromWishlist = "DELETE FROM wishlist WHERE user_id = $1 AND wishlist_name = $2 AND isbn = $3 AND ctid IN ( SELECT ctid FROM wishlist ORDER BY isbn LIMIT 2)";
const getBookPrice = "SELECT bookprice FROM book WHERE isbn = $1";
const moveBookToShoppingCart = "INSERT INTO shoppingcart(cart_id, user_id, isbn, quantity, price) VALUES(DEFAULT, $1, $2, $3, $4)"

module.exports = {
  getBooksFromWishlist,
  checkWishlists,
  addEmptyWishlist,
  delWishlist,
  addToWishlist,
  delFromWishlist,
  getBookPrice,
  moveBookToShoppingCart,
};
