const pool = require("../../db");

const createUser = 'INSERT INTO "User"(username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *'
const findUserByUserId = 'SELECT username, first_name, last_name FROM "User" WHERE user_id = $1';
const findUserByUsername = 'SELECT username, first_name, last_name FROM "User" WHERE username = $1'
const updateUser = 'UPDATE "User" SET first_name = $2, last_name = $3 WHERE user_id = $1'
const createCreditCard = 'INSERT INTO "creditcard"(card_holder_name, card_number, expiration_date, card_user_id) VALUES ($1, $2, $3, $4)'
const getUserCards = 'SELECT * FROM "creditcard" WHERE card_user_id = $1'

const findOne = async (user) => {
    const userFound = await pool.query(findUserByUsername, [user])
    .then(res => {
        return res.rowCount > 0;
    }).catch(err => console.log(err));

    return userFound;
}



const createQuery = async (query, information) => {
     await pool.query(query,  information);
}

const findAllUserCards = async (userid) => {
    try {
        const cards = await pool.query(getUserCards, [userid])
        return cards.rows;
    } catch(err) {
        console.log(err);
    }
}


const getByUsername = async(id) => {
    
    const user = await pool.query(findUserByUsername, [id])
    .then(results => {
        return results.rows[0];
    }).catch(err => console.log(err))
    
    return user;
}


const updateUserFields = async (userInformation) => {
    await pool.query(updateUser, userInformation);
}


module.exports = {
    createUser,
    findUserByUserId,
    findUserByUsername,
    updateUserFields,
    createCreditCard,
    findOne,
    getByUsername,
    findAllUserCards,
    createQuery,
}