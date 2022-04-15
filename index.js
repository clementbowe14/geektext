const express = require("express")
const authorRoutes = require("./src/Author/routes");
const bookRoutes = require("./src/Book/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/book", bookRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));