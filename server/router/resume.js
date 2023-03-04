import express from 'express'
import resumeHandler from '../router_handler/resume.js'

const router = express.Router()

// generate digital resume by userId and selected cert list
router.post('/resume/generate', resumeHandler.generateDigitalResume)

export default router