import React from "react"
import LoginStore from './login.Store'
import UserStore from './user.Store'
import CertificateStore from "./certificate.Store"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.certificateStore = new CertificateStore()
  }
}

const StoresContext = React.createContext(new RootStore())
const useStore = () => React.useContext(StoresContext)
export { useStore }