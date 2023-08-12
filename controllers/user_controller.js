const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mailService = require('./mailService');
const logger=require('../logger')


const registeruser = ((req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user != null) {
                let err = new Error(`User ${req.body.email} already exists.`)
                res.status(400)
                return next(err)
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return next(err)
                user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    password: hash
                })
                
                user.save().then(user => {
                    res.status(201).json({
                        status: 'User registered successfully',
                        userId: user._id,
                    })
                }).catch(next)
            })
        }).catch(next)
    })
    

const loginuser = (req, res, next) => {
    const { email, code } = req.body;
    mailService.sendVerificationCode(email, code);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user == null) {
                let err = new Error(`User ${req.body.email} has not been registered yet`)
                res.status(404)
                return next(err)
            }
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if (err) return next(err)
                if (!status) {
                    let err = new Error('Password does not match.')
                    res.status(401)
                    return next(err)
                }
                let data = {
                    userId: user._id, 
                    role: user.role
                    
                }
                jwt.sign(data, process.env.SECRET,
                    {'expiresIn': '3d' }, (err, token) => {
                        if (err) return next(err)
                        res.json({
                            success:true,
                            status: 'Login success',
                            token: token,
                            user:user,
                            role:user.role
                        })
                        logger.log(`user with ${userId} id Logged in successfully`)
                    })
            })

        }).catch(next)
}

const getAllUsers = (req, res, next) => {
    User.find()
        .populate('address')
        .then((users) => {
            res.status(200).json({
                success: true,
                message: "List of users",
                data: users
            });
        }).catch((err) => next(err))
  
}
const deleteallusers = (req, res) => {
    User.deleteMany()
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)
}

const getUserByID = (req, res, next) => {
    User.findById(_id = req.user.userId)
        .populate('address')
        .then((user) => {
           res.status(200).json({
           success:true,
           message:'User details',
           data:user,
           }
              )}
        ).catch(next)
    
}

const updateUserByID = (req, res, next) => {
    if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return next(err)
            req.body.password = hash
            User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                .then((user) => {
                    res.status(200).json({
                        success:true,
                        message:'User updated successfully',
                        data:user,
                    })
                }).catch(next)

        }
        )
    }
}


const deleteUserByID = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply)
        }).catch(next)
    // deletedbooks = books.filter(item => item.id != req.params.id);
    // res.json(deletedbooks)
}





module.exports = {
    getAllUsers,
    registeruser,
    loginuser,
    getUserByID,
    updateUserByID,
    deleteUserByID,
    deleteallusers,
}
