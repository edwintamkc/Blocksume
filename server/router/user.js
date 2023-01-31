import express from 'express'
import userHandler from '../router_handler/user.js'

const router = express.Router()


// register
router.post('/register', userHandler.register)

// login
router.post('/login', userHandler.login)

export default router