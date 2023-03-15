import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
import download from 'downloadjs'

class ResumeStore {
    constructor() {
        makeAutoObservable(this)
    }

    generateDigitalResume = async (userId, certificateList) => {
        try {
            await http.post('/resume/generate', {
                userId,
                certificateList,
            }, {responseType: 'blob'}).then(res => {
                download(new Blob([res.data]), 'resume.pdf', 'application/pdf');
            })


        } catch (e) {
            console.log(e)
        }
    }
}

export default ResumeStore