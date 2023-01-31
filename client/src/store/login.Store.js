// login module
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken } from '@/utils'

class LoginStore {
    // get token from local storage
    // if get, then set it to token, if no set it to ''
    token = getToken() || ''

    constructor() {
        makeAutoObservable(this)
    }

    // mobile = username, code = password
    login = async ({ username, password }) => {
        try{
            const res = await http.post('http://localhost:3001/api/login', {
                username: username,
                password: password
            })
            
            const data = res.data
            // 1 means error, 0 means ok
            if(data.status === 1){
                return false
            } else if(data.status === 0){
                
                // save token to current object
                this.token = res.data.token
                // save to local storage
                setToken(res.data.token)

                return true
            }
        } catch (e) {
            console.log(e)
            return false
        }
        
    }
}

export default LoginStore