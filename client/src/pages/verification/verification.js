import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const Verification = () => {
    const { verificationCode } = useParams()
    const { userStore } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        async function verifyAccount() {
            const res = await userStore.verifyAccount(verificationCode)

            if (res.status === true) {
                message.success(res.message)
                setTimeout(() => {
                    navigate('/login')
                }, 3000)

            } else if (res.status === false) {
                message.error(res.message)
            }
        }
        verifyAccount()
    }, [])

    return (
        <h2>Your account has been verified. You could now log in to the system.</h2>
    )
}

export default observer(Verification)