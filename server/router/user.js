import express from 'express'
import userHandler from '../router_handler/user.js'

const router = express.Router()


// register
router.post('/api/register', userHandler.register)

// login
router.post('/api/login', userHandler.login)

// get user info
router.get('/user/info', userHandler.getUserInfo)

export default router