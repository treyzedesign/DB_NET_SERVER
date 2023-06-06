const jwt = require('jsonwebtoken')
require('dotenv').config()
const AuthUser = async(req, res, next)=>{
    const AuthHeader = req.headers.authorization
    const token = AuthHeader.split(" ")[1]
     
    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decode)=>{
        if(err){
            res.status(401).json({
                error: err,
                message: "Unauthorized Action, You need to login"

            })
        }

        req.user = decode
        
        next()
    })
}

module.exports = {AuthUser}