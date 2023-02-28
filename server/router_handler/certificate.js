import db from '../db/index.js'

const assignCert = (req, res) => {
    const values = req.body
    console.log(values) // testing
    
    // const result = new Promise((resolve, reject) => {
    //     db.getConnection((err, connection) => {
    //         // connect fail, return
    //         if(err){
    //             return reject(err);
    //         }
            
    //         // connect ok, start transaction
    //         connection.beginTransaction((beginErr) => {
    //             // create transaction fail, return
    //             if(beginErr){
    //                 connection.release()
    //                 return reject(beginErr)
    //             }

    //             let sqlStr = 'insert into certificate (certificate_name, issue_organization_id, issue_organization_name, receiver_name, duration_start_date, duration_end_date, creation_date, description, image_address) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    //             // db.query(sqlStr, [values.], (err, results) => {
                    
    //             // })
    //         })
                

            
    //     })
    // })
    
}

export default { assignCert }