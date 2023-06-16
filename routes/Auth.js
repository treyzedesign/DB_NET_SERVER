const { Router } = require("express")
const { createUser, loginUser, refresh, logout } = require('../controller/AuthController')
const AuthRouter = Router()

AuthRouter.post('/createUser', createUser);
AuthRouter.post('/login', loginUser);
AuthRouter.post('/refresh', refresh)
AuthRouter.post('/logout', logout)

module.exports = AuthRouter