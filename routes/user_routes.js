const express = require('express')
const userController = require('../controllers/user_controller')
const router = express.Router()


router.route('/login')
    .post(userController.loginuser)

router.route('/register')
    .post(userController.registeruser)

module.exports = router