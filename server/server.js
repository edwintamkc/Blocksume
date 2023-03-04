import express from 'express'
import { expressjwt } from 'express-jwt'
import dotenv from 'dotenv'
import userRouter from './router/user.js'
import certificateRouter from './router/certificate.js'
import resumeRouter from './router/resume.js'

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


// middleware
// encapsulate a function for writing status and message in the res (result) object
app.use((req, res, next) => {
  // status = 1 means error exist, status = 0 means no error
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// token handler
app.use(expressjwt({secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256']}).unless({ path: [/^\/api\//]}))

// add routers
app.use(userRouter) 
app.use(certificateRouter)
app.use(resumeRouter)

// middleware
// error middleware
app.use((err, req, res, next) => {
  // token expire
  if(err.name === 'UnauthorizedError'){
    res.status(401).cc(process.env.INVALID_TOKEN_OR_TOKEN_EXPIRED)
  }

  // unknown error
  res.cc(err)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});