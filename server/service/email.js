import nodemailer from 'nodemailer'
import { BLOCKSUME_SERVICE_EMAIL_ACCOUNT, BLOCKSUME_SERVICE_EMAIL_PASSWORD } from '../config/email.js'

const sendVerificationEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: BLOCKSUME_SERVICE_EMAIL_ACCOUNT,
            pass: BLOCKSUME_SERVICE_EMAIL_PASSWORD
        }
    })

    try{
        const info = await transporter.sendMail({
            from: BLOCKSUME_SERVICE_EMAIL_ACCOUNT,
            to: '',
            subject: 'Verification link from Blocksume',
            text: 'Hello world'
        })
        console.log('verification email is sent: ' + info.messageId)
    } catch (e) {
        console.log(e)
    }
}

export { sendVerificationEmail }