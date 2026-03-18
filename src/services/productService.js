const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');


async function createProduct(productDetails) 
{
    //1. we should check if an image is coming to create the product , 
    // then we should upload it on cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
        const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
        var productImage = cloudinaryResponse.secure_url;
        await fs.unlink(process.cwd() + "/" + imagePath);
        }
        catch(error){
            console.log(error);
            // throw {reason:"Not able to create product",statusCode: 500 };
            throw new InternalServerError();
        }
        
    }
    //2.use the url from cloudinary and other product details to add products in DB
        const product = await productRepository.createProduct({
             ...productDetails,
             productImage: productImage
        });
 
       if(!product){
        throw {reason:"Not able to create product",statusCode: 500 }

       }

        return product;
}

async function getProductById(productId){
    const response = await productRepository.getProductById(productId);
    if(!response){
        // throw{reason:"Not able to find the product",statusCode:404};
        throw new NotFoundError('product');
    }
    return response;

}
async function deleteProductById(productId){
    const response = await productRepository.deleteProductById(productId);
    if(!response){
        // throw{reason:"Not able to delete the product",statusCode:500};
        throw new NotFoundError('product');
    }
    return response;

}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}