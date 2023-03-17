import nodemailer from 'nodemailer'
import { BLOCKSUME_SERVICE_EMAIL_ACCOUNT, BLOCKSUME_SERVICE_EMAIL_PASSWORD } from '../config/email.js'

const sendVerificationEmail = async (receiverEmail, verificationLink) => {
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
            to: receiverEmail,
            subject: 'Blocksume: verification link',
            text: 'Please click the following link to active your account: ' + verificationLink
        })
        console.log('verification email is sent: ' + info.messageId)
    } catch (e) {
        console.log(e)
    }
}

export { sendVerificationEmail }