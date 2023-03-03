import React from "react"
import LoginStore from './loginStore'
import UserStore from './userStore'
import CertificateStore from "./certificateStore"

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