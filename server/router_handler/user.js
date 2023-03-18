import db from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getHashByString } from '../utils/utils.js'
import { sendVerificationEmail } from '../service/email.js'
import moment from 'moment'


const registerAsIssuer = (req, res) => {
    console.log('start registrating as issuer')

    const userInfo = req.body
    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    if (!userInfo.username || !userInfo.password) {
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD, 1)
    }

    // 1. checking
    // 1.1 check if this username exists
    let sqlStr = 'select * from all_users where username=?'
    db.query(sqlStr, userInfo.username, async (err, results) => {
        // error exist
        if (err) {
            return res.cc(err, 1)
        }
        // username duplicate
        if (results.length > 0) {
            return res.cc(process.env.DUPLICATE_USERNAME, 1)
        }

        // 1.2 check if this email already registered
        sqlStr = `select 1 from profile_issuer where email = "${userInfo.email}"`
        const matchedEmails = await db.query(sqlStr)

        if (matchedEmails.length > 0) {
            return res.cc(process.env.DUPLICATE_EMAIL, 1)
        }

        // 1.3 check if the email domain exists
        const emailDomain = userInfo.email.slice(userInfo.email.indexOf('@') + 1)
        sqlStr = `select 1 from company where company_email_domain = "${emailDomain}"`
        const matchedCompanies = await db.query(sqlStr)

        if (matchedCompanies.length === 0) {
            return res.cc(process.env.INVALID_EMAIL_DOMAIN, 1)
        }

        // 2. prepare verification code
        const verificationCode = getHashByString(userInfo.username + userInfo.password)

        // 3. encrypt password
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // 4. register
        await db.beginTransaction()

        try {
            // 4.1 insert into profile_issuer
            let company_id = matchedCompanies[0].company_id
            sqlStr = `insert into profile_issuer (company_id, position, email, creation_date, last_modify_date) 
            values ("${company_id}", "${userInfo.position}", "${userInfo.email}", "${currentTime}", "${currentTime}")`

            db.query(sqlStr).then(profileData => {

                // 4.2 insert into all_users
                sqlStr = `insert into all_users (username, password, profile_id, user_identifier, creation_date, last_modify_date)
                values ("${userInfo.username}", "${userInfo.password}", "${profileData.insertId}", 1, "${currentTime}", "${currentTime}")`

                db.query(sqlStr).then(userData => {
                    // 4.3 update user id to profile_issuer
                    sqlStr = `update profile_issuer set user_id = ${userData.insertId} where profile_id = "${profileData.insertId}"`
                    db.query(sqlStr)

                    // 4.4 insert into account_verification
                    sqlStr = `insert into account_verification (user_id, verification_code, is_verified, creation_date, last_modify_date)
                        values ("${userData.insertId}", "${verificationCode}", "false", "${currentTime}", "${currentTime}")`
                    db.query(sqlStr).then(async accountVerificationInfo => {

                        await db.commit()

                        // 5. send verification email
                        const verificationLink = 'http://localhost:3000/account/activate/' + verificationCode
                        await sendVerificationEmail(userInfo.email, verificationLink)

                        return res.cc(process.env.REGISTRATION_SUCCESS, 0)

                    }).catch(async error => {

                        await db.rollback()

                        console.log('error exists in registerAsIssuer db.query:\n' + error)
                        return res.cc(process.env.REGISTRATION_FAIL, 1)
                    })
                })
            })
        } catch (error) {
            await db.rollback()

            console.log('error exists in registerAsIssuer try-catch:\n' + error)
            return res.cc(process.env.REGISTRATION_FAIL, 1)
        } finally {

            console.log('end registrating as issuer')
        }
    })
}

const registerAsReceiver = (req, res) => {
    console.log('start registrating as receiver')

    const userInfo = req.body
    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    if (!userInfo.username || !userInfo.password) {
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD, 1)
    }

    // 1. checking
    // 1.1 check if this username exists
    let sqlStr = 'select * from all_users where username=?'
    db.query(sqlStr, userInfo.username, async (err, results) => {
        // error exist
        if (err) {
            return res.cc(err, 1)
        }
        // username duplicate
        if (results.length > 0) {
            return res.cc(process.env.DUPLICATE_USERNAME, 1)
        }

        // 1.2 check if this email already registered
        sqlStr = `select 1 from profile_receiver where email = "${userInfo.email}"`
        const matchedEmails = await db.query(sqlStr)

        if (matchedEmails.length > 0) {
            return res.cc(process.env.DUPLICATE_EMAIL, 1)
        }

        // 2. prepare verification code
        const verificationCode = getHashByString(userInfo.username + userInfo.password)

        // 3. encrypt password
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // 4. register
        await db.beginTransaction()

        try {
            // 4.1 insert into profile_receiver
            sqlStr = `insert into profile_receiver (user_full_name, email, verification_access_code, creation_date, last_modify_date) 
            values ("${userInfo.fullName}", "${userInfo.email}", "${userInfo.accessCode}", "${currentTime}", "${currentTime}")`

            db.query(sqlStr).then(profileData => {

                // 4.2 insert into all_users
                sqlStr = `insert into all_users (username, password, profile_id, user_identifier, creation_date, last_modify_date)
                values ("${userInfo.username}", "${userInfo.password}", "${profileData.insertId}", 2, "${currentTime}", "${currentTime}")`

                db.query(sqlStr).then(userData => {
                    // 4.3 update user id to profile_receiver
                    sqlStr = `update profile_receiver set user_id = ${userData.insertId} where profile_id = "${profileData.insertId}"`
                    db.query(sqlStr)

                    // 4.4 insert into account_verification
                    sqlStr = `insert into account_verification (user_id, verification_code, is_verified, creation_date, last_modify_date)
                        values ("${userData.insertId}", "${verificationCode}", "false", "${currentTime}", "${currentTime}")`
                    db.query(sqlStr).then(async accountVerificationInfo => {

                        await db.commit()

                        // 5. send verification email
                        const verificationLink = 'http://localhost:3000/account/activate/' + verificationCode
                        await sendVerificationEmail(userInfo.email, verificationLink)

                        return res.cc(process.env.REGISTRATION_SUCCESS, 0)

                    }).catch(async error => {

                        await db.rollback()

                        console.log('error exists in registerAsIssuer db.query:\n' + error)
                        return res.cc(process.env.REGISTRATION_FAIL, 1)
                    })
                })
            })
        } catch (error) {
            await db.rollback()

            console.log('error exists in registerAsReceiver try-catch:\n' + error)
            return res.cc(process.env.REGISTRATION_FAIL, 1)
        } finally {

            console.log('end registrating as receiver')
        }
    })
}

const login = (req, res) => {
    const userInfo = req.body

    if (!userInfo.username || !userInfo.password) {
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD)
    }

    let sqlStr = `select * from all_users a, account_verification v where a.username = "${userInfo.username}" and a.user_id = v.user_id`
    db.query(sqlStr).then(results => {
        if (results.length !== 1) {
            return res.cc(process.env.INCORRECT_USERNAME, 1)
        }

        // did not verify account
        if (results[0].is_verified === 'false') {
            return res.cc(process.env.PLEASE_VERIFY_YOUR_ACCOUNT, 1)
        }

        // compare encrypted password
        const isSamePassword = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!isSamePassword) {
            return res.cc(process.env.INCORRECT_PASSWORD, 1)
        }

        // success
        // return user id and token
        const tokenStr = jwt.sign({ username: userInfo.username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        res.send({
            status: 0,
            message: process.env.LOGIN_SUCCESS,

            token: 'Bearer ' + tokenStr,
            userId: results[0].user_id
        })
    })


}

const getUserInfo = async (req, res) => {
    const userInfo = req.query

    let isIssuer = await checkIsIssuer(userInfo.username)

    if (isIssuer) { // cert issuer
        getCertificateIssuerInfo(userInfo.username, req, res)
    } else { // cert receiver
        getCertificateReceiverInfo(userInfo.username, req, res)
    }

}

const checkIsIssuer = async (username) => {
    let sqlStr = `select user_identifier from all_users where username = "${username}"`

    let result = null
    await db.query(sqlStr).then(data => {
        // database setting: user_identifier = 1 means certificate issuer, user_identifier = 2 means certificate receiver
        result = data[0].user_identifier === 1 ? true : false
    })

    return result
}

const getCertificateIssuerInfo = (username, req, res) => {
    let sqlStr = `select * from all_users a, profile_issuer p, company c where a.username = "${username}" and p.company_id = c.company_id and a.user_id = p.user_id`

    db.query(sqlStr).then(results => {

        // no result
        if (results.length !== 1) {
            return res.cc(process.env.CANNOT_RETRIEVE_USER_INFO, 1)
        }

        // no error
        // return user info
        res.send({
            status: 0,
            message: process.env.SUCCESS,

            userId: results[0].user_id,
            username: results[0].username,
            profileId: results[0].profile_id,
            userIdentifier: results[0].user_identifier,
            companyId: results[0].company_id.toString(),
            companyName: results[0].company_name,
            companyAddress: results[0].company_address,
            position: results[0].position,
            email: results[0].email
        })
    })
}

const getCertificateReceiverInfo = (username, req, res) => {
    let sqlStr = `select * from all_users a, profile_receiver p where a.username = "${username}" and a.user_id = p.user_id`

    db.query(sqlStr).then(results => {

        // no result
        if (results.length !== 1) {
            return res.cc(process.env.CANNOT_RETRIEVE_USER_INFO, 1)
        }

        // no error
        // return user info
        res.send({
            status: 0,
            message: process.env.SUCCESS,

            userId: results[0].user_id,
            username: results[0].username,
            profileId: results[0].profile_id,
            userIdentifier: results[0].user_identifier,
            email: results[0].email,
            userFullName: results[0].user_full_name,
            verificationAccessCode: results[0].verification_access_code
        })
    })
}

const checkVerificationAccessCode = async (req, res) => {
    const verificationAccessCode = req.body.verificationAccessCode
    const certId = req.body.certId

    let sqlStr = `select verification_access_code from profile_receiver where user_id = (select receiver_id from transaction where certificate_id = ${certId})`
    const results = await db.query(sqlStr)
    if (results.length === 0) {
        return res.cc(process.env.INVALID_CERT_NUMBER, 1)
    }

    if (results[0].verification_access_code === verificationAccessCode) {
        return res.cc(process.env.SUCCESS, 0)
    } else {
        return res.cc(process.env.INVALID_ACCESS_CODE, 1)
    }

}

const verifyUser = async (req, res) => {
    const verificationCode = req.body.verificationCode
    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    
    let sqlStr = `select verification_id, is_verified from account_verification where verification_code = "${verificationCode}"`
    db.query(sqlStr).then( async results => {
        if(results.length === 0){
            return res.cc(process.env.INVALID_VERIFICATION_CODE, 1)
        }
        if(results[0].is_verified === 'true'){
            return res.cc(process.env.ACCOUNT_HAS_ALREADY_BEEN_VERIFIED, 1)
        }

        sqlStr = `update account_verification set is_verified = "true", last_modify_date = "${currentTime}" where verification_id = ${results[0].verification_id}`
        await db.query(sqlStr)
        return res.cc(process.env.ACCOUNT_HAS_BEEN_VERIFIED, 0)

    })
}

export default { registerAsIssuer, registerAsReceiver, login, getUserInfo, checkVerificationAccessCode, verifyUser }