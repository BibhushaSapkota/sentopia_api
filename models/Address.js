const mongoose = require('mongoose')
const user=require('./User')

const AddressSchema = mongoose.Schema({
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
}, { timestamps: true })
module.exports = mongoose.model('Address', AddressSchema)
