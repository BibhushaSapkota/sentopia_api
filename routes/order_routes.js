const express = require('express')
const OrderController = require('../controllers/orders_controller')
const auth = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .get(auth.verifyUser,auth.verifyAdmin,OrderController.getAllOrders)
    .post(auth.verifyUser,OrderController.createOrder)

router.route('/:id')
    .get(auth.verifyUser,OrderController.getOrdersbyUser)
    .delete(auth.verifyUser,OrderController.deleteOrder)

module.exports = router