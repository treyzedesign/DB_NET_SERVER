const jwt = require('jsonwebtoken')
require('dotenv').config()
const AuthUser = async(req, res, next)=>{
    const AuthHeader = req.headers.authorization
    const token = AuthHeader.split(" ")[1]
    console.log(token)
    try{
        if(!token){
            res.status(403).json({
                message: "Token not provided"
    
            })
        }
           jwt.verify(token, process.env.TOKEN_SECRET, (err, decode)=>{
            if(err){
                res.status(401).json({
                    error: err,
                    message: "Unauthorized Action, expired token"
    
                })
            }else{
                req.user = decode
            
                next()
            }  
        })
    }catch(error){
        res.status(400).json({
            message: error.message

        })
    }
    
   
     
}

module.exports = {AuthUser}