import express from 'express'
import certificateHandler from '../router_handler/certificate.js'

const router = express.Router()

// assgin certificate
router.post('/certificate/assign', certificateHandler.assignCert)

// get certificate list by userId
router.get('/certificate', certificateHandler.getCertificateList) 

// get getBlockchain address by userId
router.get('/certificate/getBlockchainAddressByUserId', certificateHandler.getBlockchainAddressByUserId)

export default router