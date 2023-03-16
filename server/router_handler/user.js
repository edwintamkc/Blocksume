import db from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// TODO: finish registration for issuer and receiver
const registerAsIssuer = (req, res) => {
    const userInfo = req.body
    console.log(userInfo)

    if (!userInfo.username || !userInfo.password) {
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD, 1)
    }

    // check if this user exists
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

        // check email domain
        const emailDomain = userInfo.email.slice(userInfo.email.indexOf('@') + 1)
        sqlStr = `select * from company where company_email_domain = '${emailDomain}'`
        const matchedEmails = await db.query(sqlStr)
        
        if(matchedEmails.length === 0){
            return res.cc(process.env.INVALID_EMAIL_DOMAIN, 1)
        }

        // // register
        // // 1. encrypt password
        // userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // // 2. insert
        // sqlStr = 'insert into all_users set ?'
        // db.query(sqlStr, { ...userInfo }, (err, results) => {
        //     if (err) {
        //         return res.cc(err)
        //     }
        //     res.cc(process.env.SUCCESS, 0)
        // })

    })
}

const registerAsReceiver = (req, res) => {
    
}

const login = (req, res) => {
    const userInfo = req.body

    if (!userInfo.username || !userInfo.password) {
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD)
    }

    let sqlStr = 'select * from all_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // error exist
        if (err) {
            return res.cc(err, 1)
        }
        if (results.length !== 1) {
            return res.cc(process.env.INCORRECT_USERNAME, 1)
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

    if(isIssuer){ // cert issuer
        getCertificateIssuerInfo(userInfo.username, req, res)
    } else { // cert receiver
        getCertificateReceiverInfo(userInfo.username, req, res)
    }

}

const checkIsIssuer = async (username) => {
    let sqlStr = `select user_identifier from all_users where username = "${username}"`

    let result = null
    await db.query(sqlStr).then( data => {
        // database setting: user_identifier = 1 means certificate issuer, user_identifier = 2 means certificate receiver
        result = data[0].user_identifier === 1 ? true : false
    })

    return result
}

const getCertificateIssuerInfo = (username, req, res) => {
    let sqlStr = 'select * from all_users a, profile_issuer p, company c where a.username = ? and p.company_id = c.company_id'

    db.query(sqlStr, username, (err, results) => {
        // error exist
        if (err) {
            return res.cc(err, 1)
        }
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
    let sqlStr = 'select * from all_users a, profile_receiver p where a.username = ? and a.user_id = p.user_id'
    
    db.query(sqlStr, username, (err, results) => {
        // error exist
        if (err) {
            return res.cc(err, 1)
        }
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
            userFullName: results[0].user_full_name
        })
    })
}

export default { registerAsIssuer, registerAsReceiver, login, getUserInfo }