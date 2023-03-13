import db from '../config/database.js'
import moment from 'moment'
import validator from '../utils/validator.js'
import { getHashByString, parseStringToDate } from '../utils/utils.js'
import { contract, ethAccount } from '../config/web3.js'

const assignCert = async (req, res) => {
    const values = req.body.values

    const issueDate = parseStringToDate(values.issueDate)
    const validUntilDate = parseStringToDate(values.validUntilDate)

    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    await db.beginTransaction()
    try {
        let certId
        let sql = `insert into certificate (certificate_ref_id, certificate_name, issue_organization_id, issue_organization_name, receiver_name, duration_start_date, duration_end_date, issue_date, valid_until_date, description) values ("${values.certificateRefId}", "${values.certificateName}", "${values.issueOrganizationId}", "${values.issueOrganizationName}", "${values.recipientFullName}", "${values.durationStartDay}", "${values.durationEndDay}", "${issueDate}", "${validUntilDate}", "${values.description}")`
        db.query(sql)
            .then(data => {
                certId = data.insertId
                return createTransaction(data.insertId, values.senderId, values.receiverId, currentTime)
            }).then(async data => {

                await db.commit()

                // add cert's hash to blockchain
                await addCertToBlockchain(certId)

                console.log('end transaction: createCertificate')
                return res.cc(process.env.ASSIGN_CERT_SUCCESS, 0)
            }).catch(async error => {
                await db.rollback()

                console.log('error exists in db.query:\n' + error)
                return res.cc(process.env.ASSIGN_CERT_FAIL)
            })
    } catch (error) {
        await db.rollback()

        console.log('error exists in assignCert try-catch:\n' + error)
        return res.cc(process.env.ASSIGN_CERT_FAIL)
    }
}

const createTransaction = (certId, senderId, receiverId, currentTime) => {
    let sql = `insert into transaction (sender_id, receiver_id, certificate_id, creation_date, last_modify_date) values ("${senderId}", "${receiverId}", "${certId}", "${currentTime}", "${currentTime}")`
    return db.query(sql)
}

const getCertificateList = async (req, res) => {
    const userId = req.query.userId

    let sql = `select c.certificate_id, c.certificate_ref_id, c.certificate_name, c.issue_organization_name, c.duration_start_date, c.duration_end_date, c.description,
    c.receiver_name, DATE_FORMAT(c.issue_date, '%Y-%m-%d') as issue_date,  DATE_FORMAT(c.valid_until_date, '%Y-%m-%d') as valid_until_date, c.image_address
    from transaction t, certificate c where t.receiver_id = ${userId} and t.certificate_id = c.certificate_id`

    const certificateList = await db.query(sql)

    res.send({
        status: 0,
        message: process.env.SUCCESS,
        certificateList
    })
}

const getRecipientFullNameByUserId = async (req, res) => {
    const userId = req.query.userId

    const isNumber = validator.validateNumber(userId)

    if (!isNumber) {
        // not number, return false
        res.send({
            status: 1,
            message: process.env.INVALID_BLOCKSUME_ID,
        })

    } else {
        let sql = `select user_identifier from all_users where user_id = ${userId}`
        const result = await db.query(sql).then(async data => {
            if (data.length > 0 && data[0].user_identifier === 2) {
                sql = `select user_full_name from profile_receiver where user_id = ${userId}`
                return await db.query(sql)
            }
        })


        if (result == undefined) {
            res.send({
                status: 1,
                message: process.env.INVALID_BLOCKSUME_ID,
            })
        } else {
            res.send({
                status: 0,
                message: process.env.SUCCESS,
                recipientFullName: result[0].user_full_name
            })
        }
    }


}

const addCertToBlockchain = async (certId) => {
    // get hash of a transaction
    const hash = await genHashOfCertByCertId(certId)

    // update blockchain   
    await contract.methods.addTransaction(certId, hash).send({ from: ethAccount, gas: '1000000' })
}

const getAllCertOnBlockchain = async () => {
    return await contract.methods.getAllTransaction().call()
}

const getCertOnBlockchainByCertId = async (certId) => {
    return await contract.methods.getHashByTransactionId(certId).call()
}

const genHashOfCertByCertId = async (certId) => {
    const str = await getCombinedStrOfCert(certId)
    return getHashByString(str)
}

const getCombinedStrOfCert = async (certId) => {
    let sql = `select * from certificate where certificate_id = ${certId}`

    const data = await db.query(sql)

    const str = data[0].certificate_id + ''
        + data[0].certificate_ref_id
        + data[0].certificate_name
        + data[0].issue_organization_name
        + data[0].receiver_name
        + data[0].duration_start_date
        + data[0].duration_end_date
        + data[0].description
        + data[0].issue_date + ''
        + data[0].image_address + ''

    return str
}

export default { assignCert, getCertificateList, getRecipientFullNameByUserId }