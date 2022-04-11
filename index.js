const express = require("express");
const wishListRoutes = require("./src/wishlist/routes");
const profileRoutes = require("./src/user/routes");
const reviewsRoutes = require("./src/reviews/routes");
const { user } = require("pg/lib/defaults");

const app = express();
const pool = require("./db");

//TODO: REMOVE BOOKS/ REMOVE WISHLISTS/ FIGURE OUT URLS

app.use(express.json()); // req.body

app.use("/", wishListRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/user", profileRoutes);

//filters books in database by user chosen genre
app.get('/book/genre/:bookgenre', (req, res) => {
	pool.query(`Select * from book where bookgenre='${req.params.bookgenre}'`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
})

//sorts books in database by top 10 best sellers
app.get('/book/copiessold', (req, res) => {
	pool.query(`Select * from book order by copiessold desc limit 10`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
})

//retrieves books from database 10 rows at a time
app.get('/book/:pagenum', (req, res) => {
	pool.query(`Select * from book limit 10 offset'${(req.params.pagenum * 10) - 10}'`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

pool.connect();
