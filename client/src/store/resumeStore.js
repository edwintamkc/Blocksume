import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class ResumeStore {
    constructor() {
        makeAutoObservable(this)
    }

    generateDigitalResume = async (userId, certificateList) => {
        try {
            const res = await http.post('/resume/generate', {
                userId,
                certificateList
            })

            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }
}

export default ResumeStore