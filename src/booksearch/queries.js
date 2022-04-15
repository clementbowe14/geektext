const getAllBooksBy10 = "Select * from book limit 10 offset $1";
const sortBooksByGenre = "Select * from book where book.bookGenre = $1";
const sortByBestSelling = "Select * from book order by copiessold desc limit 10";
const sortBooksByRating = "SELECT ISBN, bookname, AVG(rating_score)::NUMERIC(10,2) FROM reviews INNER JOIN book on reviews.review_ISBN = book.ISBN GROUP BY ISBN, book.bookName ORDER BY ISBN"

module.exports = {
	getAllBooksBy10,
	sortBooksByGenre,
	sortByBestSelling,
	sortBooksByRating
};