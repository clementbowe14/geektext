
const express = require("express");
const { user } = require("pg/lib/defaults");
const app = express();
const pool = require('./db');


app.use(express.json()); // req.body



app.post("/user", async(req, res) => {

    try {
        const {username, password, first_name, last_name} = req.body;
        const userValues = [username, password, first_name, last_name];
        const createUserQuery = 'INSERT INTO "User"(username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *'
        await pool.query(createUserQuery, userValues).catch(err => console.log(err));
        

    } catch(err) {
        console.log('something went wrong');
        // res.sendStatus(400);
    }
    res.sendStatus(200)
});

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
})

