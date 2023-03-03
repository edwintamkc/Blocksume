import { makeAutoObservable } from "mobx"
import { http, getUsername } from '@/utils'

class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async () => {

        await http.get('/user/info', {
            params: {
                username: getUsername()
            }

        }).then((res) => {
            let data = res.data

            this.userInfo.userId = data.userId
            this.userInfo.username = data.username
            this.userInfo.profileId = data.profileId
            this.userInfo.userIdentifier = data.userIdentifier
            this.userInfo.companyId = data.companyId
            this.userInfo.companyName = data.companyName
            this.userInfo.position = data.position
            this.userInfo.email = data.email
            this.userInfo.ethAddress = data.ethAddress

        }).catch((e) => {
            console.log(e)
        })
    }
}

export default UserStore