import express from 'express'
import certificateHandler from '../router_handler/certificate.js'

const router = express.Router()

// assgin certificate
router.post('/certificate/assign', certificateHandler.assignCert)

// get certificate list by userId
router.get('/certificate', certificateHandler.getCertificateList) 

// get user full name by userId (only accept user type = receiver)
router.get('/certificate/getRecipientFullNameByUserId', certificateHandler.getRecipientFullNameByUserId)

export default router