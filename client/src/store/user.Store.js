import { makeAutoObservable } from "mobx"
import { http, getUsername } from '@/utils'

class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    async getUserInfo() {

        const res = await http.get('/getUserInfo', {
            params: {
                username: getUsername()
            }

        }).then((res) => {
            this.userInfo.username = res.data.username
        }).catch((e) => {
            console.log(e)
        })

    }
}

export default UserStore