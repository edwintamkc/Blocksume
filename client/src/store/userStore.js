import { makeAutoObservable } from "mobx"
import { http, getUsername } from '@/utils'
import { makePersistable } from "mobx-persist-store"

class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)

        // data persistence
        makePersistable(this, {
            name: 'UserStore',
            properties: ['userInfo'],
            storage: window.localStorage
        })
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
            this.userInfo.userFullName = data.userFullName

        }).catch((e) => {
            console.log(e)
        })
    }
}

export default UserStore