const { Router } = require("express")
const { createUser, loginUser } = require('../controller/AuthController')
const AuthRouter = Router()

AuthRouter.post('/createUser', createUser);
AuthRouter.post('/login', loginUser);


module.exports = AuthRouter