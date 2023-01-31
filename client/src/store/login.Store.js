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
    getToken = async ({ username}) => {
        try{
            const res = await http.post('http://localhost:3001/api/getToken', {
            username: username,
            })
            
            // save token to current object
            this.token = res.data.token
            // save to local storage
            setToken(res.data.token)
        } catch (e) {
            console.log(e)
        }
        
    }

    // isValidToken = async () => {
    //     try {
    //         const res = await http.get('http://localhost:3001/isValidToken', {})
    //         const data = res.data
    
    //         if(data.status === 401){
    //             return false
    //         } else if(data.status === 200){
    //             return true
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

export default LoginStore