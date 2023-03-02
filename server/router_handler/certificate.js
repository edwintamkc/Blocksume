import db from '../config/database.js'
import moment from 'moment'

const assignCert = async (req, res) => {
    const values = req.body.values
    let currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    return res.cc(process.env.ASSIGN_CERT_FAIL)

    // await db.beginTransaction()
    // try {
    //     let sql = `insert into certificate (certificate_name, issue_organization_id, issue_organization_name, receiver_name, duration_start_date, duration_end_date, creation_date, description) values ("${values.certificateName}", "${values.issueOrganizationId}", "${values.issueOrganizationName}", "${values.recipientName}", "${values.durationStartDay}", "${values.durationEndDay}", "${currentTime}", "${values.description}")`
    //     db.query(sql)
    //         .then(data => {
    //             return createTransaction(data.insertId, values.senderId, values.receiverId, currentTime)
    //         }).then(async data => {
    //             await db.commit()

    //             console.log('end transaction: createCertificate')
    //             return res.cc(process.env.ASSIGN_CERT_SUCCESS, 0)
    //         }).catch(async error => {
    //             await db.rollback()

    //             console.log('error exists in db.query:\n' + error)
    //             return res.cc(process.env.ASSIGN_CERT_FAIL)
    //         })
    // } catch (error) {
    //     await db.rollback()

    //     console.log('error exists in assignCert try-catch:\n' + error)
    //     return res.cc(process.env.ASSIGN_CERT_FAIL)
    // }



}

const createTransaction = (certId, senderId, receiverId, currentTime) => {
    let sql = `insert into transaction (sender_id, receiver_id, certificate_id, creation_date, last_modify_date) values ("${senderId}", "${receiverId}", "${certId}", "${currentTime}", "${currentTime}")`
    return db.query(sql)
}

export default { assignCert }