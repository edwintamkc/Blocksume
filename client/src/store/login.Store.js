// login module
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken, setUsername, removeUsername } from '@/utils'

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
            const res = await http.post('/api/login', {
                username: username,
                password: password
            })
            
            const data = res.data
            // 1 means error, 0 means ok
            if(data.status === false){
                return data
            } else if(data.status === true){
                
                // save token to current object
                this.token = res.data.token
                // save to local storage
                setToken(res.data.token)
                setUsername(username)

                return data
            }
        } catch (e) {
            console.log(e)
            return false
        }
        
    }

    logout = () => {
        this.token = ''
        removeToken()
        removeUsername()
    }
}

export default LoginStore