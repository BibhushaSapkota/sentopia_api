const Address = require("../models/Address")
const User= require("../models/User")

const getuseraddress = (req, res, next) => {
    User.findOne({_id:req.params.id})   
        .populate('address')
        .then((user) => {
            res.status(200).json({
                success: true,
                message: "List of address",
                data: user.address
            });
        }).catch((err) => next(err))
}

const createaddress = (req, res, next) => {
    let address = {
        ...req.body,
       
    }
    Address.create(address).then(address => {
        User.findByIdAndUpdate({_id:req.body.user},{$set:{address:address._id,isFormFilled:true}},{new:true})
            .then(
                user=>{res.status(201).json({
                    success: true,
                    message: 'Address added successfully',
                    data: address
                }
            )
        
        }).catch(next)
       
    }).catch(next)
}

const deleteaddress = (req, res) => {
    Address.deleteOne({_id:req.params.id})
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)
}

const updateaddress = (req, res, next) => {
    Address.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((address) => {
            res.status(201).json({
                message: 'Address updated successfully',
                data: address
            })
        }
        ).catch(next)
}

module.exports = {
    getuseraddress,
    createaddress,
    deleteaddress,
    updateaddress
}