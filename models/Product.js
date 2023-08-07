const mongoose = require('mongoose')
const category = require('./Category')
const user=require('./User')

const ProductSchema = mongoose.Schema({
    image:{
        type:String
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    
}, { timestamps: true })
module.exports = mongoose.model('Product', ProductSchema)
