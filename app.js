require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger =require('./logger')

const mongoose = require('mongoose')//
const path = require('path')
const user_routes = require('./routes/user_routes')
const category_routes = require('./routes/category_routes')
const product_routes = require('./routes/product_routes')
const cart_routes = require('./routes/cart_routes')
const order_routes = require('./routes/order_routes')
const address_routes = require('./routes/address_routes')
const port = 3000
const app = express()
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/scentopia')
    .then(() => {
        console.log('connected to mongodb server')
        app.listen(port, () => {
            console.log(`App is running on port: ${port} `)
        })
    }).catch((err) => console.log(err))

// application level middleware
app.use((req, res, next) => {
    logger.log(`${req.method} ${req.path} ${req.ip}`, req.ip)
    console.log(`${req.method} ${req.path} ${req.ip}`)  
    next()
})

app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);

// starts with(^) / or ends with($) / or is index or index.html then 
app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//express defined middleware
app.use(express.json())


// routes
app.use('/users',user_routes)
app.use('/categories',category_routes)
app.use('/products',product_routes)
app.use('/cart',cart_routes)
app.use('/order',order_routes)
app.use('/address',address_routes)

// error handling middleware
// when there is value in err parameter then it gets executed

app.use((err, req, res, next) => { 
    console.log(err.stack)  
    logger.log(err.stack,req.ip)
    if (res.statusCode == 200) res.status(500)
    res.json({ "err": err.message })
    
})

module.exports = app