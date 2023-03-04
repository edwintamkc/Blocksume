import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class ResumeStore {
    constructor() {
        makeAutoObservable(this)
    }

    generateDigitalResume = async (userId, certificateIdList) => {
        try {
            const res = await http.post('/resume/generate', {
                userId,
                certificateIdList
            })

            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }
}

export default ResumeStore