import express from 'express'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use((req, res, next) => {
      if(req.path !== '/' && !req.path.includes('.')){
        res.set({
          'Access-Control-Allow-Credentials': true, 
          'Access-Control-Allow-Origin': req.headers.origin || '*', 
          'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type, Authorization', 
          'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
          'Content-Type': 'application/json; charset=utf-8'
        })
      }
      req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressjwt({secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256']}).unless({ path: [/^\/api\//]}))
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    return res.send({
      status: 401,
      message: process.env.TOKEN_EXPIRED
    })
  }

  res.send({
    status: 500,
    message: process.env.UNKNOWN_ERROR
  })
})

app.get('/', (req, res) => {
    res.send('server is ready')
})

app.post('/api/getToken', (req, res) => {
    const userInfo = req.body
    console.log(userInfo)

    const tokenStr = jwt.sign({username: userInfo.username}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
    res.send({token:tokenStr})
})

// app.get('/isValidToken', (req, res) => {
//   res.send({
//     status: 200,
//     message: process.env.SUCCESS
//   })
// })








const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});