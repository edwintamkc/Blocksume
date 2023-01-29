// login module
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class LoginStore {
    token = ''
    constructor() {
        makeAutoObservable(this)
    }

    // mobile = username, code = password
    getToken = async ({ mobile, code }) => {
        // const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
         const res = await http.post('http://localhost:3001/getData', {
            mobile,
            code
        })
        console.log(res)
        this.token = res.data.token
    }
}

export default LoginStore