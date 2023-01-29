import React from "react"
import LoginStore from './login.Store'

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
  }
}

const StoresContext = React.createContext(new RootStore())
const useStore = () => React.useContext(StoresContext)
export { useStore }