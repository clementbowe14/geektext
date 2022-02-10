
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


app.listen(3000, () => {
    console.log("server is listening on port 3000");
})

