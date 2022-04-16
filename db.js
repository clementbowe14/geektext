require('dotenv').config()

const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
});

module.exports = pool;