import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class CertificateStore {
    constructor() {
        makeAutoObservable(this)
    }

    assignCert = async(values) => {
        try {
            const res = await http.post('/assignCertificate', {
                values
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default CertificateStore