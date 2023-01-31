import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
import { useStore } from '@/store'

// exmaple
// <AuthComponent> <Layout /> <AuthComponent/>
// Layout component is a child in this case
// it will check whether token exists, if yes, return Layout, if not navigate to login


function AuthComponent({ children }) {
    const { loginStore } = useStore()
    let isValidToken = false

    // if token exists and it is still valid
    if(getToken()){
        return <>{ children }</>
    } else {
        return <Navigate to="/login"/>
    }
}



export { AuthComponent }