const User = require('../models/User')
const Cart = require('../models/Cart');

const addtocart= async function(req,res,next) {
    try {
      const {product, quantity, amount} = req.body;
      Cart.find({user:req.user._id})
      .then((cart) => 
      {
          cart = new Cart({
            product: product,
            user: req.user.user,
            quantity: quantity,
            amount:amount
          })
          cart.save().then((cart) => {
            res.status(201).json({
              success: true,
              message: "Item added cart!",
              data: cart,
            });
          })
      });
      
    } catch (error) {
        res.status(500).json({  
            message: error.message, 
        })
    } 
}
const clearcart= async function(req,res,next){
  try {
    const productId = req.params.id;
    const userId = req.user.user._id;
    console.log(productId, userId);
    const response = await Cart.deleteOne().where("product").equals(productId).where("user").equals(userId);
    if (response.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Item Deleted Successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "This item is not in cart!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

const updatecart = async function (req, res) {
    try {
        const productId = req.params.id
        const userId =  req.user._id
        let updatedcart=await Cart.updateOne({productId, userId}, {quantity:req.body.quantity},{new:true})

        res.status(201).json({
            success:true,
            message: "Quantity Updated Succesfully!",
            // async and await ma return garne tarika
            data:updatedcart,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} 


const deleteAllCartFromUser = (req, res, next)=>{
 Cart.find()
 .where("user").equals(req.params.id)
  .then((cart)=>{
    cart.forEach((cart)=>{
      cart.remove()
    })
    res.status(200).json({
      success: true,
      message: "Cart Deleted Succesfully!",     
    })
  })
}

const getCartByUser =(req,res,next)=> {
  try{
    Cart.find()
    .where("user").equals(req.params.id)
    .populate({path:'user',populate:{path:'address'}})
    .populate({path: 'product', populate: {path: 'category'}})
   .then((cart)=> {
      console.log(cart)
      res.status(200).json({
        success: true,
        message: "List of Cart",
        data: cart

      })
    })

  }catch (error) {
    res.status(500).json({
        message: error.message
    })
}
}



const getcart = (req, res, next) => {

    Cart.findById(req.params.id)
    .populate('user')
    .populate({path: 'product', populate: {path: 'category'}})
      .then((cart) => {
          res.status(200).json({
              success: true,
              message: "List of products",
              data: cart
          });
      }).catch((err) => next(err));
}


module.exports = {
    addtocart,
    clearcart,
    updatecart,
    getCartByUser,
    getcart,
    deleteAllCartFromUser,
}