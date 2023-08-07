const Category = require('../models/Category')

const getallcategory = (req, res, next) => {
    Category.find()
        .then((category) => {
            res.status(200).json({
                success: true,
                message: "List of all categories",
                data: category,
            });
        }).catch((err) => next(err))

}
const createallcategory=(req,res,next)=>{
    Category.create(req.body)
        .then((category) => {
            res.status(200).json({
                success: true,
                message: "Category added successfully",
                data: category,
            });
        }).catch((err) => next(err))    
}


const deleteallcategory=(req,res,next)=>{
    Category.deleteMany()
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)

}

const getcategorybyID=(req,res,next)=>{
    Category.findById(req.query.id)
        .then((category) => {
            res.status(200).json({
                success: true,
                message: " category by id",
                data: category,
            });
        }
        ).catch(next)

}
const updatecategorybyID=(req,res,next)=>{
    Category.findByIdAndUpdate(req.params.category_id, { $set: req.body },{new:true})
        .then((category) => {
            res.json(category)
        }
        ).catch(next)

}
const deletecategorybyID=(req,res,next)=>{
    Category.findByIdAndDelete(req.params.category_id)
        .then((reply)=>{
            res.json(reply)
        }).catch(next)

}

module.exports={
    getallcategory,
    createallcategory,
    deleteallcategory,
    getcategorybyID,
    updatecategorybyID,
    deletecategorybyID

}
