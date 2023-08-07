const express = require('express')
const ProductController = require('../controllers/products_controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const Product = require('../models/Product')

const router = express.Router()
router.route('/')
    .get(ProductController.getallproducts)
    // .post(auth.verifyUser, auth.verifyVendor, ProductController.createproducts)
    .post(auth.verifyUser, auth.verifyAdmin, upload.single('image'), ProductController.createproducts)
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .delete(auth.verifyAdmin, ProductController.deleteallproducts)

router.route('/:id')
    .get(ProductController.getProductByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" })
    })
    .put(auth.verifyUser, auth.verifyAdmin, ProductController.updateProductByID)
    .delete(auth.verifyUser, auth.verifyAdmin, ProductController.deleteProductByID)

module.exports = router