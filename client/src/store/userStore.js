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

    registerIssuer = async ({ username, password, email, position }) => {
        const res = await http.post('/api/register/issuer', {
            username,
            password,
            email,
            position
        })

        return res.data
    }

    registerReceiver = async ({ username, password, email, fullName, accessCode }) => {
        const res = await http.post('/api/register/receiver', {
            username,
            password,
            email,
            fullName,
            accessCode
        })

        return res.data
    }

    checkVerificationAccessCode = async ({ verificationAccessCode, certId }) => {
        const res = await http.post('/api/checkVerificationAccessCode', {
            verificationAccessCode,
            certId
        })

        return res.data
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
            this.userInfo.verificationAccessCode = data.verificationAccessCode

        }).catch((e) => {
            console.log(e)
        })
    }

    verifyAccount = async (verificationCode) => {
        const res = await http.post('/api/user/verify', {
            verificationCode
        })

        return res.data
    }
}

export default UserStore