const mongoose = require('mongoose')

// creating tables for cart
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type:Number,
        default:1
    },
    amount:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Cart", cartSchema);