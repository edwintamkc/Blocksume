import express from 'express'
import userHandler from '../router_handler/user.js'

const router = express.Router()


// register as issuer
router.post('/api/register/issuer', userHandler.registerAsIssuer)

// register as receiver
router.post('/api/register/receiver', userHandler.registerAsReceiver)

// login
router.post('/api/login', userHandler.login)

// get user info
router.get('/user/info', userHandler.getUserInfo)

export default router