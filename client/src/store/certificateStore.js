import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
import { makePersistable } from "mobx-persist-store"

class CertificateStore {
    certificateList = []
    verifiedCert = {}
    isValidCert = false

    constructor() {
        makeAutoObservable(this)

        // data persistence
        makePersistable(this, {
            name: 'CertificateStore',
            properties: ['verifiedCert'],
            storage: window.localStorage
        })
    }

    assignCert = async (values) => {
        try {
            const res = await http.post('/certificate/assign', {
                values
            })

            return res.data

        } catch (e) {
            console.log(e)
        }
    }

    getCertificateList = async (userId) => {

        const result = await http.get('/certificate', {
            params: {
                userId
            }
        }).then((res) => {

            this.certificateList = res.data.certificateList

        }).catch((e) => {
            console.log(e)
        })
    }

    getRecipientFullNameByUserId = async (userId) => {

        try {
            const result = await http.get('/certificate/getRecipientFullNameByUserId', {
                params: {
                    userId
                }
            })

            return result.data

        } catch (e) {
            console.log(e)
        }
    }

    verifyCertByCertId = async (certId) => {
        await http.get('/api/certificate/verifyCertByCertId', {
            params: {
                certId
            }
        }).then(result => {
            let data = result.data

            this.verifiedCert.certificateRefId = data.certificateRefId
            this.verifiedCert.certificateName = data.certificateName
            this.verifiedCert.issueOrganizationName = data.issueOrganizationName
            this.verifiedCert.receiverName = data.receiverName
            this.verifiedCert.durationStartDay = data.durationStartDay
            this.verifiedCert.durationEndDay = data.durationEndDay
            this.verifiedCert.issueDate = data.issueDate
            this.verifiedCert.validUntilDate = data.validUntilDate
            this.verifiedCert.description = data.description

            this.isValidCert = data.status

        }).catch((e) => {
            console.log(e)
        })

    }
}

export default CertificateStore