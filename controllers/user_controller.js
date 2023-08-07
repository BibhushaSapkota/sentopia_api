const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mailService = require('./mailService');


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
                            user:user
                        })
                    })
            })

        }).catch(next)
}



module.exports = {
    registeruser,
    loginuser
}
