const express = require('express')
const CartController = require('../controllers/carts_controller')
const auth = require('../middleware/auth')

const router = express.Router()
//to insert cart
router.route('/')
    .post(auth.verifyUser,CartController.addtocart)

router.route("/user/:id")
    .get(auth.verifyUser,CartController.getCartByUser)
    .delete(auth.verifyUser,CartController.deleteAllCartFromUser)

router.route('/:id')
    .get(auth.verifyUser,CartController.getcart)
    .delete(auth.verifyUser,CartController.clearcart)
    .put(auth.verifyUser,CartController.updatecart)

    
module.exports = router