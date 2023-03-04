import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class CertificateStore {
    certificateList = []
    receiverBlockchainAddress = ''

    constructor() {
        makeAutoObservable(this)
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

    getBlockchainAddressByUserId = async (userId) => {

        const result = await http.get('/certificate/getBlockchainAddressByUserId', {
            params: {
                userId
            }
        }).then((res) => {

            this.receiverBlockchainAddress = res.data.blockchainAddress

        }).catch((e) => {
            console.log(e)
        })
    }
}

export default CertificateStore