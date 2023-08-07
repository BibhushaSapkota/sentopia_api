const express = require('express')
const AddressController = require('../controllers/address_controller')
const auth = require('../middleware/auth')

const router = express.Router()
router.route('/')   
    .post(auth.verifyUser,AddressController.createaddress)

router.route('/:id')
    .get(auth.verifyUser,AddressController.getuseraddress)
    .delete(auth.verifyUser,AddressController.deleteaddress)
    .put(auth.verifyUser,AddressController.updateaddress)

module.exports = router