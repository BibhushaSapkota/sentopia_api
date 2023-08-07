
const jwt=require('jsonwebtoken')

const verifyUser=(req,res,next)=>{
    if (!req.headers.authorization){
        let err=new Error('Authorization Token is missing')
        res.status(400)
        return next (err)
    }
    token= req.headers.authorization.split(' ')[1]
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if(err) return next(err)
        req.user=decoded
        next()
    })
}

const verifyAdmin=(req,res,next)=>{
    if(req.user.role!='Admin'){
        let err= new Error('You are not authorized')
        res.status(403)
        return next(err)
    }
    next()
}

const verifyVendor=(req,res,next)=>{
    if(req.user.role!='Vendor' ){
        res.status(403)
        next(new Error('Not authorized'))
    }
    next()
    
}
module.exports={verifyUser,verifyAdmin,verifyVendor}
