import express from 'express'

const app = express();

app.use((req, res, next) => {
      if(req.path !== '/' && !req.path.includes('.')){
        res.set({
          'Access-Control-Allow-Credentials': true, 
          'Access-Control-Allow-Origin': req.headers.origin || '*', 
          'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', 
          'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
          'Content-Type': 'application/json; charset=utf-8'
        })
      }
      req.method === 'OPTIONS' ? res.status(204).end() : next()
    })

app.get('/', (req, res) => {
    res.send('server is ready')
})

app.post('/getData', (req, res) => {
    res.send({data: 'testing data!'})
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});