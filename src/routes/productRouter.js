const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/mulltermiddleware,js');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn, 
    isAdmin , 
    uploader.single('productImage'),
    addProduct
); // this is a route registration
productRouter.get('/:id',getProduct);
productRouter.delete('/:id',deleteProduct);


module.exports = productRouter; // exporting the router 