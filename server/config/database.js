import mysql from 'mysql'
import bluebird from 'bluebird'

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_db_01'
})

db.query = bluebird.promisify(db.query)
export default db