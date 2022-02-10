const Pool = require("pg").Pool;

const pool = new Pool ({
    user: 'postgres',
    password: 'URWEaQzz99',
    database: 'geektext',
    host: "localhost",
    port: 5432,
});

module.exports = pool;