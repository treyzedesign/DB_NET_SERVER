const User = require('../model/User')
const bcryptjs = require('bcryptjs')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

require('dotenv').config()
// console.log(joi)

//@desc signup
//@route POST api/createUser
//access Public

const createUser = async (req, res)=>{
    const {name, email, studentNumber, password} = req.body

    try {
        const schema = joi.object({
            name: joi.string().regex(/^[a-zA-Z]+/).required(),
            email: joi.string().email().required(),
            studentNumber : joi.string().regex(/^[a-zA-Z0-9/]+$/).required(),
            password: joi.string().regex(/^[a-zA-Z0-9]/).min(8).required(),
        })
        const { error } = schema.validate(req.body)
        if (error) {
           res.status(400).json({
                message: error.details[0].message.replace(/\"/g, '' ).replace(": /^[a-zA-Z]+$/", '')
            });
        }else{
            const findUser = await User.findOne({email:email})
            if(findUser){
                return res.status(409).json({
                    message: "account already exists"
                });
            }else{
                const hashedPassword = await bcryptjs.hash(password, 10)
                const newUser ={
                    id: uuid.v4(),
                    name : name,
                    email:email,
                    studentNumber:studentNumber,
                    password: hashedPassword 
                }
                await User.create(newUser).then(()=>{
                    res.status(201).json({
                        message: "account created"
                    });
                }).catch((err)=>{
                    res.status(400).json({
                        message: err.message
                    });
                })
            }
        }
            
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const generateToken = (obj)=>{
    const token = jwt.sign({
        id: obj.id, 
        name: obj.name
    }, process.env.TOKEN_SECRET, {expiresIn: "30s"});

    return token;
}
const refreshToken= (obj)=>{
    const token = jwt.sign({
        id: obj.id,
        name: obj.name
    }, process.env.REFRESH_SECRET, {expiresIn: "1y"});

    return token;
}

//@desc Login
//@route POST api/login
//access Public
const loginUser = async(req, res)=>{
    // res.send("hello")
    const { email, password } = req.body
    try {
        if (req.body == null || req.body == undefined) {
           res.status(400).json({
                message: 'please fill the fields'
           })
        }
        const user = await User.findOne({email:email})
        if(user){
            console.log(user);
            const comparePassword = await bcryptjs.compare(password, user.password)
            if(comparePassword){
                res.cookie('refresh_token', refreshToken(user), {
                    // httpOnly: false,
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    // secure: false,
                    sameSite: false
                })

                res.status(200).json({
                    message: 'logged in successfully',
                    data: user,
                    token: generateToken(user)
                })
            }else{
                res.status(404).json({
                    message: 'invalid password',
                   
                })
            }
        }else{
            res.status(404).json({
                message: 'invalid email',
               
            })
        }
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }   
    
}

const refresh = async(req, res)=>{
    const {refresh_token} = req.body
    try {
        if (!refresh_token) {
            res.status(403).json({
                message: "refresh token is not provided"
            })
        }
    
        await jwt.verify(refresh_token, process.env.REFRESH_SECRET , (err, decode)=>{
            if(err){
                res.status(401).json({
                    error: err,
                    message: "Unauthorized Action, You need to login"
    
                })
            }else{
                const user = decode
                const newAccessToken = jwt.sign({id: user.id, name: user.name}, process.env.TOKEN_SECRET, {expiresIn: "30s"})
                res.status(200).json({
                    message: newAccessToken
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logout = async(req,res)=>{
    res.clearCookie("refresh_token", {path: '/'})
}
module.exports = {
    createUser,
    loginUser,
    refresh,
    logout
}