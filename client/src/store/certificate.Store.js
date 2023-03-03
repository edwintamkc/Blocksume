import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class CertificateStore {
    certificateList = []

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

            console.log('raw data is:')
            console.log(res.data.certificateList)

            this.certificateList = res.data.certificateList

            console.log('cert list is:')
            console.log(this.certificateList)


        }).catch((e) => {
            console.log(e)
        })

        // console.log('result is:')
        // console.log(result.data.data)

        // this.certificateList = result.data.data

        // console.log('list is:')
        // console.log(this.certificateList)
    }
}

export default CertificateStore