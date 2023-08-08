const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:['Admin','User'],
        default: 'User'
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },  
    isFormFilled:{
        type:Boolean,
        default:false
    },
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)

