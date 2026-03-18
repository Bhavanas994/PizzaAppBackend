const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    items:[
        {
            product: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product',
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true,
                            default: 1
                        }
        }
    ],
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'ORDERED',
        enum: ['ORDERED','PROCESSING','DELIVERED','CANCELLED','OUT_FOR_DELIVERY']
        
    },
    address:{
        type: String,
        minLenght:[10,'Address should be at least 1o charaters']
    },
    paymentMethod:{
        type: String,
        enum: ['ONLINE','CASH'],
        default: 'CASH'
    }
},{
    timestampa: true
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;