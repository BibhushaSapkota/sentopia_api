const Order = require('../models/Order');

// Get all orders

const getAllOrders=(req,res,next)=>{
  Order.find()
    .then((orders)=>{
      res.status(200).json({
        status:true,
        message: 'List of orders',
        data: orders
      });
    }).catch((error)=>{
      res.status(500).json({
        message: 'Fetching orders failed'
      });
    });

}
const getOrdersbyUser=(req,res,next)=>{
  Order.find({user: req.params.id})
    .populate({path:'user',populate:{path:'address'}})
    .populate({path: 'product', populate: {path: 'category'}})
    .then((orders)=>{
      res.status(200).json({
        status:true,
        message: 'List of orders',
        data: orders
      });
    }).catch((error)=>{
      res.status(500).json({
        message: 'Fetching orders failed'
      });
    });
}
  


const createOrder=(req,res,next)=>{
  const order = new Order({
    ...req.body,
  });
  Order.create(order).then((createdOrder)=>{
    res.status(201).json({
      status:true,
      message: 'Order added successfully',
      data: order
    });
  }).catch((error)=>{
    res.status(500).json({
      message: 'Creating order failed'
    });
  });
}

const deleteOrder=(req,res,next)=>{
  Order.findByIdAndDelete(req.params.id).then((result)=>{
    if(result){
      res.status(200).json({
        status:true,
        message: 'Order deleted successfully',
        data: result
      });
    }else{
      res.status(404).json({
        message: 'Order not found'
      });
    }
  }).catch((error)=>{
    res.status(500).json({
      message: 'Deleting order failed'
    });
  });
}

module.exports={getOrdersbyUser,createOrder,deleteOrder,getAllOrders}