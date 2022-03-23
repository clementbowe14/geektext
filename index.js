const express = require("express");
const routes = require("./src/routes");
const { user } = require("pg/lib/defaults");
const app = express();
const pool = require("./db");

//TODO: REMOVE BOOKS/ REMOVE WISHLISTS/ FIGURE OUT URLS

app.use(express.json()); // req.body

app.use("/", routes);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

pool.connect();
