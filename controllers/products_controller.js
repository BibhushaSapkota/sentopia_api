const Product = require('../models/Product')
const category = require('../models/Category')
const logger = require('../logger')

const getallproducts = (req, res, next) => {
    Product.find()
        .populate('category')
        .then((products) => {
            res.status(200).json({
                success: true,
                message: "List of products",
                data: products
            });
        }).catch((err) => next(err))
    //res.json(books)
}
const createproducts = (req, res, next) => {
    let product = {
        ...req.body,
        
    }

    const file = req.file;
    if (file) {
        const fileName = req.file.filename;
        product.image = '/images/product_image/' + fileName;
    }

    Product.create(product).then(product => {
        res.status(201).json({
            message: 'Product added successfully',
            data: product
        })
        logger.log(`Product ${req.body.name} added successfully by ${req.user.email}`)

    }).catch(next)


}
const deleteallproducts = (req, res) => {
    Product.deleteMany()
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)
}

const getProductByID = (req, res, next) => {
    Product.findById(req.params.id)
        .populate('category')
        .then((product) => {
            res.status(200).json({
                success: true,
                message: "Product by ID",
                data:product
            });
        }
        ).catch(next)
    
}
const updateProductByID = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((product) => {
            res.json(product)
        }
        ).catch(next)
    
}
const deleteProductByID = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply)
        }).catch(next)
    
}
const searchProductByCategory = (req, res, next) => {
    const categoryId = req.query.categoryId;
    Product.find({ category: categoryId })
        .populate("category", "-__v")
        .then(
            (product) => {
                res.status(201).json({
                    success: true,
                    message: "List of products by category",
                    data: product,
                });
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    success: false,
                    message: err,
                });
            }
        );
}

module.exports = {
    getallproducts,
    createproducts,
    deleteallproducts,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductByCategory,
}

