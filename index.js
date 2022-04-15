const express = require("express");
const wishListRoutes = require("./src/wishlist/routes");
const profileRoutes = require("./src/user/routes");
const reviewsRoutes = require("./src/reviews/routes");
const authorRoutes = require("./src/Author/routes");
const bookRoutes = require("./src/Book/routes");
const { user } = require("pg/lib/defaults");

const app = express();
const pool = require("./db");

//TODO: REMOVE BOOKS/ REMOVE WISHLISTS/ FIGURE OUT URLS

app.use(express.json()); // req.body

app.use("/", wishListRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/user", profileRoutes);
app.use("/author", authorRoutes);
app.use("/book", bookRoutes);
app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/book", bookRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
})
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

pool.connect();

