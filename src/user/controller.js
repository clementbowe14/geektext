const pool = require("../../db");
const queries = require("./queries");




 const createUser = async(req, res) => {

    try {
        const {username, password, first_name, last_name} = req.body;
        if(queries.findOne(username)) {
            
            queries.createQuery(queries.createUser, 
                [username, password, first_name, last_name])

        } else {
            res.send("The user already exists")
        }

    } catch(err) {
        
        res.sendStatus(400).send(err)
    }
};

const getUser = async(req, res) => {
    
    try {
        const {username} = req.body
        const user = await queries.getByUsername(username)
        return res.send(user);
    }
    catch(err) {
        console.log(err)
    }
}

const addNewCreditCard = async(req, res) => {
   
    try {
        const {card_holder_name, card_number, expiration_date, user_id} = req.body;
        queries.createQuery(queries.createCreditCard,
             [card_holder_name, card_number, expiration_date, user_id])
        res.sendStatus(200)

    } catch(err) {
        res.sendStatus(400)
    }
}

const getUserCards = async(req, res) => {
    try {
        const {userid} = req.body;
        const cards = await queries.findAllUserCards(userid);
        res.status(200).send(cards)
    } catch(err) {
        res.status(400).send(err)
    }
}

const updateUserFields = async (req, res) => {
    try {
        const {first_name, last_name, user_id} = req.body;
        queries.updateUserFields([user_id, first_name, last_name])
        res.sendStatus(200);
    }
    catch(err) {
        res.sendStatus(400)
    }
    

}

module.exports = {
    createUser,
    getUser,
    addNewCreditCard,
    getUserCards,   
    updateUserFields, 
}