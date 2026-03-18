const { getCart ,modifyCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req,res){
   try{
     const cart = await getCart(req.user.id);
     return res.status(200).json ({
        success: true,
        message: "Successfully fetched the cart",
        data: cart,
        error: {}

     })
   }
   catch(error){
    console.log(error);
    if(error instanceof AppError){
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error
      });
    }
    return res.status(500).json({
        success: false,
        message: "Something went wrong" ,
        data: {},
        error: error
      });
   }
}

async function modifyProductToCart(req,res){
   try{
     const cart = await modifyCart(req.user.id,req.params.productId,req.params.operation == "add");
     return res.status(200).json ({
        success: true,
        message: "Successfully modified product in cart",
        data: cart,
        error: {}

     })
   }
   catch(error){
    console.log(error);
    if(error instanceof AppError){
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error
      });
    }
    return res.status(500).json({
        success: false,
        message: "Something went wrong" ,
        data: {},
        error: error
      });
   }
}

module.exports = {
    getCartByUser,
modifyProductToCart
};