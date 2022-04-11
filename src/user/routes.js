const { Router } = require("express")

const controller = require("./controller")
const router = Router()


//create a new user
router.post("/", controller.createUser)

//get user by their userid
router.get("/:userid", controller.getUser)

//add a new credit card
router.post("/:userid/card", controller.addNewCreditCard)

// get all credit cards created by the user
router.get("/:userid/card", controller.getUserCards)

// update the user
router.put("/:userid", controller.updateUserFields)

module.exports = router;