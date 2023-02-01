import db from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = (req, res) => {
    const userInfo = req.body
    
    if(!userInfo.username || !userInfo.password){
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD)
    }

    // check if this user exists
    let sqlStr = 'select * from all_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // error exist
        if(err){
            return res.cc(err)
        }
        // username duplicate
        if(results.length > 0){
            return res.cc(process.env.DUPLICATE_USERNAME)
        }

        // register
        // 1. encrypt password
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        
        // 2. insert
        sqlStr = 'insert into all_users set ?'
        db.query(sqlStr, { ...userInfo}, (err, results) => {
            if(err){
                return res.cc(err)
            }
            res.cc(process.env.SUCCESS, 0)
        })

    })
}

const login = (req, res) => {
    const userInfo = req.body

    if(!userInfo.username || !userInfo.password){
        return res.cc(process.env.INVALID_USERNAME_OR_PASSWORD)
    }

    let sqlStr = 'select * from all_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // error exist
        if(err){
            return res.cc(err)
        }
        if(results.length !== 1){
            return res.cc(process.env.LOGIN_FAIL)
        }
        
        // compare encrypted password
        const isSamePassword = bcrypt.compareSync(userInfo.password, results[0].password)
        if( !isSamePassword){
            return res.cc(process.env.INCORRECT_PASSWORD)
        }

        // success, create and return token
        const tokenStr = jwt.sign({username: userInfo.username}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
        res.send({
            status: 0,
            message: process.env.LOGIN_SUCCESS,
            token: 'Bearer ' + tokenStr
        })
    })
}

const getUserInfo = (req, res) => {
    const userInfo = req.query
    
    // TODO: should query database and send all user data here
    // but for now, only send username
    res.send({
        username: userInfo.username
    })
 
}

export default {register, login, getUserInfo}