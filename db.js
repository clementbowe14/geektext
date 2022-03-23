const Pool = require("pg").Pool;

const pool = new Pool ({
    user: 'postgres',
    password: 'postgres',
    database: 'geektext',
    host: "localhost",
    port: 5432,
});

module.exports = pool;
