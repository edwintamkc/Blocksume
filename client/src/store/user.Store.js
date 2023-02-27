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
            let data = res.data

            this.userInfo.username = data.username
            this.userInfo.userId = data.userId
            this.userInfo.profileId = data.profileId
            this.userInfo.userIdentifier = data.userIdentifier
            
        }).catch((e) => {
            console.log(e)
        })

    }
}

export default UserStore