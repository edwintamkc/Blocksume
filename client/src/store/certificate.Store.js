import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class CertificateStore {
    constructor() {
        makeAutoObservable(this)
    }

    assignCert = async (values) => {
        try {
            const res = await http.post('/assignCertificate', {
                values
            })

            return res.data

        } catch (e) {
            console.log(e)
        }
    }
}

export default CertificateStore