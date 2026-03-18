const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required: [true ,"product name is required"],
        minLength:[5,"product name must be atleast 5 characters"],
        trim:true
    },
    description:{
        type:String,
        minLength:[5,"description must be atleast 5 characters"]
    },
    productImage:{
        type:String,
    },
    quantity:{
        type:Number,
        required:true ,
        default:10
    },
    price:{
        type:Number,
        required: [true,"product price is required"]
    },
    category: {
        type:String,
        enum:["veg","non-veg","drinks","sides"],
        default:"veg"
    },
    inStock: {
        type:Boolean,
        required:[true,"Instock data is required"],
        default:true
    }
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;