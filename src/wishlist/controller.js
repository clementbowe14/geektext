const pool = require("../../db");
const queries = require("./queries");

const getBooksFromWishlist = (req, res) => {
  const id = req.params.userid;
  const name = req.params.wishname;
  pool.query(queries.getBooksFromWishlist, [id, name], (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });

  pool.end;
};

const getWishLists = (req, res) => {
  const id = req.params.userid;
  pool.query(queries.checkWishlists, [id], (err, result) => {
    if (!err) {
      var userWishes = [];
      result.rows.forEach((row) => {
        if (!userWishes.includes(row.wishlist_name)) {
          userWishes.push(row.wishlist_name);
        }
      });
      res.send(userWishes);
    }
  });
};

const addEmptyWishlist = (req, res) => {
  const wish = req.body;
  const id = req.params.userid;

  if (wish.delete === true) {
    pool.query(queries.delWishlist, [wish.name,id], (err, result) => {
      if (!err) {
        res.send("Successfully deleted wishlist: " + wish.name);
      } else {
        res.send("Something went wrong while deleting your wishlist. Please try again later")
      }
    });
  } else {
    pool.query(queries.checkWishlists, [id], (err, result) => {
      if (!err) {
        var userWishes = [];
        var alreadyExists = false;

        result.rows.forEach((row) => {
          if (row.wishlist_name == wish.name) {
            alreadyExists = true;
          }

          if (!userWishes.includes(row.wishlist_name)) {
            userWishes.push(row.wishlist_name);
          }
        });
        if (!userWishes.includes(wish.name)) {
          userWishes.push(wish.name);
        }
        if (userWishes.length > 3) {
          insertNewWishlist(true, alreadyExists);
        } else {
          insertNewWishlist(false, alreadyExists);
        }
      }
    });

    var insertNewWishlist = function (atLimit, alreadyExists) {
      if (!alreadyExists) {
        if (!atLimit) {
          pool.query(
            queries.addEmptyWishlist,
            [wish.name, id],
            (err, result) => {
              if (!err) {
                res.send("Added " + wish.name + " to your wishlists");
              } else {
                console.log(err.message);
              }
            }
          );
          pool.end;
        } else {
          res.send("You already have 3 wishlists!");
        }
      } else {
        res.send("A wishlist with that name already exists!");
      }
    };
  }

  pool.end;
};

const addToWishlist = (req, res) => {
  const name = req.params.wishname;
  const id = req.params.userid;
  const book = req.body.isbn;

  if (req.body.delete === true) {
    pool.query(queries.delFromWishlist, [id,name,book], (err, result) => {
      if (!err) {
        res.send("Successfully deleted " + book + " from your wishlist!");
      } else {
        res.send("Something went wrong while deleting your book. Please try again later");
      }
    });
  } else if (req.body.move === true && req.body.quantity !== undefined) {
    pool.query(queries.getBookPrice, [book], (err, result) => {
      if (!err) {
        moveBookToShoppingCart(result.rows[0].bookprice);
      } else {
        res.send("Something went wrong while fetching book details. Please try again later");
      }
    });

    var moveBookToShoppingCart = function (price) {
      pool.query(queries.moveBookToShoppingCart, [id, book, req.body.quantity, price], (err, result) => {
        if (!err) {
          deleteBookFromWishlist();
        } else {
          res.send("Something went wrong while moving book to shopping cart. Please try again later");
        }
      });
    };

    var deleteBookFromWishlist = function () {
      pool.query(queries.delFromWishlist, [id, name, book], (err, result) => {
        if (!err) {
          res.send("Successfully moved " + book + " to your shopping cart!");
        } else {
          res.send("Something went wrong while deleting book from your wishlist, however the book was successfully moved to your shopping cart.");
        }
      });
    };
  } else if (req.body.move === true && req.body.quantity === undefined) {
    res.send("Please add quantity");
  } else {
    pool.query(queries.addToWishlist, [name,id,book], (err, result) => {
      if (!err) {
        res.send("Successfully added " + book + " to your wishlist!");
      } else {
        res.send("Something went wrong while adding your book. Please try again later");
      }
    });
  }
};

module.exports = {
  getBooksFromWishlist,
  addEmptyWishlist,
  getWishLists,
  addToWishlist,
};
