const { response } = require('express');
const pool = require('../../db');
const queries =  require ('./queries')

//gets all the available shopping carts (only real useful for admins) and the final presentation
const getShoppingCart = (req, res)=> {
    pool.query(queries.getShoppingCart,(error, results)=>{
        if (error)throw error;
        res.status(200).json(results.rows)
});
};


//gets all the books in the specific cart and lists them 
const getBooksInCart = (req, res)=> {
   const id = parseInt(req.params.id)
   pool.query(queries.getBooksInCart, [id], (error, results) =>{
       if(error)throw error;
       res.status(200).json(results.rows)
   });
};

//gets all the details within the cart including quantity, price etc.
const getCartDetails = (req, res)=> {
    const id = parseInt(req.params.id)
    pool.query(queries.getCartDetails, [id], (error, results) =>{
        if(error)throw error;
        res.status(200).json(results.rows)
    });
 };
 

//creates shopping cart by user id 
const createShoppingCart = (req,res)=> {
    const {user_id, ISBN, quantity, price } = req.body;
    const id = parseInt(req.params.user_id);
    //const id = req.params.id

    //checks if cart id already exists
    pool.query(queries.checkCartExists,[id],(error,results)=>{
        if(results.rows.length){
            return res.send("Cart ID already exists for this User, Please user /cart/(enter your id) to see your cart details ")
        }
      //creates new cart if applicable
        pool.query(queries.createShoppingCart, [ user_id, ISBN, quantity, price ], (error,results) =>{
            if(error)throw error;
            res.status(201).send("Cart Created Succesfully");

        });

    });
    };

    


//deletes cart by cart id
const deleteCart = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getCartDetails, [id], (error,results)=>{
        const noCartFound = !results.rows.length;
        if(noCartFound){
            return res.send("Cart does not exist for given user, could not delete please enter your user_id/create to create a shopping cart"); 
        }
        
        pool.query(queries.deleteCart,[id],(error,results)=>{
            if(error)throw error;
            res.status(200).send("Cart deleted succesfully!");
        });
    })
};

//updates any existing cart and gives error if no cart exists
const updateCart = (req,res)=>{
    const id = parseInt(req.params.id);
    const { ISBN , quantity, price } = req.body;

    pool.query(queries.getCartDetails, [id], (error,results)=>{
        const noCartFound = !results.rows.length;
        if(noCartFound){
            return res.send("Cart does not exist for given user, could not update,please enter your user_id/create to create a shopping cart"); 
        }
        
        pool.query(queries.updateCart, [id, ISBN, quantity, price], (error,results)=>{
            if(error)throw error;
            res.status(201).send("Cart Updated Successfully");

        });
    });
    
};




//all exports
module.exports = {
    getShoppingCart,
    getBooksInCart,
    getCartDetails,
    createShoppingCart,
    deleteCart,
    updateCart
};

