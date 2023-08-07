const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Product'},

    ],
    amount:{
        type:Number,
        required:true
    },
    quantity:[{
        type:Number,
    }],
    status:{
        type:String,
        default:"pending",
        enum:["pending","paid","not paid"]
    }
}, { timestamps: true })
module.exports = mongoose.model('Orders', OrderSchema)
