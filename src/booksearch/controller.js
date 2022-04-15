const pool = require("../../db");
const queries = require("./queries");

//retrieves books from database 10 rows at a time
const getAllBooks = (req, res) => {
	const offset = (req.params.pagenum * 10) - 10
	pool.query(queries.getAllBooksBy10, [offset], (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
}

//filters books in database by user chosen genre
const sortBooksByGenre = (req, res) => {
	const genre = req.params.bookgenre
	pool.query(queries.sortBooksByGenre, [genre], (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
}

//sorts books in database by the top 10 best sellers
const sortByBestSelling = (req, res) => {
	pool.query(queries.sortByBestSelling, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
}

//sorts books with a rating greater than or equal to the chosen rating
const sortBooksByRating = (req, res) => {
	pool.query(queries.sortBooksByRating, (err, result) => {
		if (!err) {
			res.send(result.rows.filter(elem => elem.avg >= req.params.rating));
		}
		else {
			res.send(err);
		}
	});
}

module.exports = {
	getAllBooks,
	sortBooksByGenre,
	sortByBestSelling,
	sortBooksByRating
};