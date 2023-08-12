const express = require('express')
const userController = require('../controllers/user_controller')
const router = express.Router()
const auth = require('../middleware/auth')


router.route('/login')
    .post(userController.loginuser)

router.route('/register')
    .post(userController.registeruser)


router.route('/')
    .get(auth.verifyUser, auth.verifyAdmin, userController.getAllUsers)
    .post((req, res) => {
        res.status(501).send({ "reply": "Post request not supported" })
    }
    )
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .delete(auth.verifyAdmin, userController.deleteallusers)

router.route('/:id')
    .get(auth.verifyUser, userController.getUserByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" })
    })
    .put(auth.verifyUser, userController.updateUserByID)
    .delete(auth.verifyUser, userController.deleteUserByID)

module.exports = router