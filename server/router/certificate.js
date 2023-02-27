import express from 'express'
import certificateHandler from '../router_handler/certificate.js'

const router = express.Router()

// assgin certificate
router.post('/assignCertificate', certificateHandler.assignCert)

export default router